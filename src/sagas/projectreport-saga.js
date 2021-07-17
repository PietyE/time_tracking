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
} from 'constants/actions-constant'
import {
  setDeveloperConsolidateProjectReport,
  setDevelopersProjectInProjectReport,
  setIsFetchingReports,
} from 'actions/projects-report'

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
    yield call(getDeveloperConsolidateProjectReport)
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

export function* watchDeveloperProjects() {
  yield takeEvery(
    [
      GET_DEV_CONSOLIDATE_PROJECT_REPORT,
      CHANGE_SELECTED_DATE_PROJECTS_REPORT,
      SET_SELECTED_DEVELOPER,
      CLEAR_SELECTED_DEVELOPER,
      SET_SELECTED_PROJECT_PROJECTREPORTS,
      CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
    ],
    getDeveloperConsolidateProjectReport
  )
  yield takeEvery(
    [GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT],
    getDeveloperProjects
  )
  yield takeEvery(SET_EXCHANGE_RATES, setExchangeRate)
}
