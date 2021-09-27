import { call, takeEvery, put, select } from 'redux-saga/effects'
import Api from 'utils/api'
import { showAler } from 'actions/alert'
import { WARNING_ALERT, SUCCES_ALERT } from 'constants/alert-constant'
import {
  GET_DEV_CONSOLIDATE_PROJECT_REPORT,
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_EXCHANGE_RATES,
  GET_USERS_PROJECT_REPORT,
  GET_CONSOLIDATE_PROJECT_REPORT,
} from 'constants/actions-constant'
import {
  getConsolidateProjectReport,
  setConsolidateProjectReport,
  setDeveloperConsolidateProjectReport,
  setDevelopersProjectInProjectReport, setErrorUsersProjectReport,
  setIsFetchingReports,
  setUsersProjectReport,
} from 'actions/projects-report'
import { getRatesList } from '../actions/currency'
import { getSelectedMonthSelector, selectUsersId } from '../reducers/projects-report'
import { consolidateReportMapper, usersProjectReportMapper } from '../utils/projectReportApiResponseMapper'

export function* getDeveloperConsolidateProjectReport() {
  yield put(setIsFetchingReports(true))
  const { month, year } = yield select(
    (state) => state.projectsReport.selectedDate
  )

  const { email = '' } = yield select(
    (state) => state.projectsReport.selectedDeveloper
  )

  const { id = '' } = yield select(
    (state) => state.projectsReport.selectedProject
  )

  const searchDeveloperParam = `${email}` || ''

  const searchProjectParam = `${id}` || ''

  let URL_DEVELOPER_PROJECT = `developer-projects/consolidated-report-by-user/${year}/${
    month + 1
  }/?search=${searchDeveloperParam}`

  if (searchProjectParam) {
    URL_DEVELOPER_PROJECT = `developer-projects/consolidated-report-by-user/${year}/${
      month + 1
    }/?project_id=${searchProjectParam}`
  }

  const { data } = yield call(
    [Api, 'consolidateReportApi'],
    URL_DEVELOPER_PROJECT
  )

  if (data) {
    yield put(setDeveloperConsolidateProjectReport(data))
  }
  yield put(setIsFetchingReports(false))

}

export function* getDeveloperProjects() {
  const URL_DEVELOPER_PROJECT = `projects/`

  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)
  yield put(setDevelopersProjectInProjectReport(data))
}

function* setExchangeRate({ payload }) {
  const { month, year } = yield select(getSelectedMonthSelector)
  try {
    const URL = 'exchange_rates/'
    yield call([Api, 'saveExchangeRate'], URL, payload)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Exchange Rate has been saved',
        delay: 5000,
      })
    )
    const now = new Date();
    const ratesParams = {
      is_active: true,
      year: now.getFullYear(),
      month: now.getMonth() + 1
    };
    yield put(getRatesList(ratesParams))
    // yield call(getDeveloperConsolidateProjectReport)
    yield call(getConsolidateProjectReport)
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

function* usersProjectReport (action) {
  const { payload: userId } = action;
    const { month, year } = yield select(
      (state) => state.projectsReport.selectedDate
    )

    const URL_USERS_PROJECT_REPORT = `users/${userId}/projects-report/${year}/${month + 1}/`
    const response = yield call([Api, 'getUsersProjectReports'], URL_USERS_PROJECT_REPORT)
    if (response.status >= 400) {
      yield put(setErrorUsersProjectReport(userId))
      return;
    }
      const mapperResponse = usersProjectReportMapper(response)
      const payload = { userId, mapperResponse };
      yield put(setUsersProjectReport(payload))
}

export function* handleGetConsolidatedReport() {
  const { month, year } = yield select(
    (state) => state.projectsReport.selectedDate
  )
  const URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
    month + 1
  }/`
  const response = yield call([Api, 'getConsolidatedReport'], URL_CONSOLIDATED_LIST_REPORT)
  const mapperResponse = consolidateReportMapper(response)
  yield put(setConsolidateProjectReport(mapperResponse))
}

export function* handleGetConsolidatedReport() {
  const { month, year } = yield select(
    (state) => state.projectsReport.selectedDate
  )

  yield put(setIsFetchingReports(true))

  const { email = '' } = yield select(
    (state) => state.projectsReport.selectedDeveloper
  )

  const { id = '' } = yield select(
    (state) => state.projectsReport.selectedProject
  )
// console.dir(month);
//   console.dir(year);

  const searchDeveloperParam = `${email}` || ''

  const searchProjectParam = `${id}` || ''

  let URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
    month + 1
  }/?search=${searchDeveloperParam}`

  if (searchProjectParam) {
    URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
      month + 1
    }/?search=${searchDeveloperParam}`
  }

  const response = yield call([Api, 'getConsolidatedReport'], URL_CONSOLIDATED_LIST_REPORT)
  console.dir(response);
  const mapperResponse = consolidateReportMapper(response)
  yield put(setConsolidateProjectReport(mapperResponse))

  const { data } = yield call(
    [Api, 'consolidateReportApi'],
    URL_CONSOLIDATED_LIST_REPORT
  )

  // if (data) {
  //   yield put(setDeveloperConsolidateProjectReport(data))
  // }
  yield put(setIsFetchingReports(false))
}


export function* watchDeveloperProjects() {
  yield takeEvery(
    [
      // GET_DEV_CONSOLIDATE_PROJECT_REPORT,
      CHANGE_SELECTED_DATE_PROJECTS_REPORT,
      SET_SELECTED_DEVELOPER,
      CLEAR_SELECTED_DEVELOPER,
      SET_SELECTED_PROJECT_PROJECTREPORTS,
      CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
      GET_CONSOLIDATE_PROJECT_REPORT
    ],
    // getDeveloperConsolidateProjectReport
    handleGetConsolidatedReport
  )
  yield takeEvery (GET_USERS_PROJECT_REPORT, usersProjectReport)
  yield takeEvery(
    [GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT],
    getDeveloperProjects
  )
  yield takeEvery(SET_EXCHANGE_RATES, setExchangeRate)
}
