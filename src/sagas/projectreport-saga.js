import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from 'utils/api'
import { pm } from '../api'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import {
  ADD_DEVELOPER_TO_PROJECT,
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  CLEAR_SELECTED_DEVELOPER,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  GET_ALL_DEVELOPER_PROJECTS,
  GET_CONSOLIDATE_PROJECT_REPORT,
  GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  GET_USERS_HOURS_AUTH_URL_REQUEST,
  GET_USERS_PROJECT_REPORT,
  SET_EXCHANGE_RATES,
  SET_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
} from 'constants/actions-constant'
import {
  getConsolidateProjectReport,
  getUsersHoursAuthUrlSuccess,
  setAllDevelopersProjectsPR,
  setConsolidateProjectReport,
  setDevelopersProjectInProjectReport,
  setErrorUsersProjectReport,
  setIsFetchingReports,
  setUsersProjectReport,
} from 'actions/projects-report'
import { getRatesList } from 'actions/currency'
import { getSelectedProjectSelector } from 'reducers/projects-report'
import {
  consolidateReportMapper,
  usersProjectReportMapper,
} from 'utils/projectReportApiResponseMapper'
import { selectActualCurrencyForUserList } from 'selectors/currency'
import { getSelectedProjectIdSelector } from 'reducers/projects-management'

export function* getDeveloperProjects() {
  const URL_DEVELOPER_PROJECT = 'projects/'

  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)
  yield put(setDevelopersProjectInProjectReport(data))
}

export function* getAllDevelopersProjectInProjectReport() {
  const { month, year } = yield select((state) => state.calendar)
  try {
    const { data } = yield call([pm, 'getAllDevelopersProjects'], {
      year,
      month,
    })
    yield put(setAllDevelopersProjectsPR(data))
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

function* setExchangeRate({ payload, callback }) {
  // eslint-disable-next-line no-unused-vars
  try {
    const URL = 'exchange_rates/'
    const response = yield call([Api, 'saveExchangeRate'], URL, payload)
    const status = `${response.status}`
    if (status[0] !== '2') {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Exchange Rate has been saved',
        delay: 5000,
      })
    )
    callback()
    const now = new Date()
    const ratesParams = {
      is_active: true,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    }
    yield put(getRatesList(ratesParams))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

function* addDevelopersToProject({ payload = [] }) {
  const project = yield select(getSelectedProjectIdSelector)
  const data = {
    project,
    users: payload,
  }
  try {
    const URL = 'developer-projects/create-list/'
    const response = yield call([Api, 'setUsersToProject'], URL, data)
    const status = `${response.status}`

    if (status[0] !== '2') {
      throw new Error()
    }

    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Users have been added',
        delay: 5000,
      })
    )
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

function* usersProjectReport(action) {
  const { payload: userId } = action
  const { month, year } = yield select((state) => state.calendar)

  const URL_USERS_PROJECT_REPORT = `users/${userId}/projects-report/${year}/${
    month + 1
  }/`
  const response = yield call(
    [Api, 'getUsersProjectReports'],
    URL_USERS_PROJECT_REPORT
  )
  const status = `${response.status}`
  if (status[0] !== '2') {
    yield put(setErrorUsersProjectReport(userId))
    return
  }
  const mapperResponse = usersProjectReportMapper(response)
  const payload = { userId, mapperResponse }
  yield put(setUsersProjectReport(payload))
}

export function* handleGetConsolidatedReport() {
  const { month, year } = yield select((state) => state.calendar)

  yield put(setIsFetchingReports(true))
  const { email = '' } = yield select(
    (state) => state.projectsReport.selectedDeveloper
  )
  const { id = '' } = yield select(
    (state) => state.projectsReport.selectedProject
  )
  const searchDeveloperParam = `${email}` || ''
  const searchProjectParam = `${id}` || ''

  let URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
    month + 1
  }/?search=${searchDeveloperParam}`

  if (searchProjectParam) {
    URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
      month + 1
    }/?project_id=${searchProjectParam}`
  }
  const response = yield call(
    [Api, 'getConsolidatedReport'],
    URL_CONSOLIDATED_LIST_REPORT
  )
  const currentCurrency = yield select(selectActualCurrencyForUserList)
  const mapperResponse = consolidateReportMapper(response, currentCurrency)
  const currentSelectedProject = yield select(getSelectedProjectSelector)

  //can be moved to separate helper function when we will refactor
  //filtering all developers by their projects and comparing with selectedProject
  const developersOnSelectedProjects = mapperResponse.filter((developer) =>
    developer.developer_projects.some(
      (proj) => proj.name === currentSelectedProject.name
    )
  )

  //if we does not select the project it will be empty array of devs because func above has not anything to compare
  //make condition if array empty we are dispatching all devs , other ways only devs on selected project
  const listOfDevelopers = developersOnSelectedProjects.length
    ? developersOnSelectedProjects
    : mapperResponse

  yield put(setConsolidateProjectReport(listOfDevelopers))
  // eslint-disable-next-line no-unused-vars
  yield call([Api, 'consolidateReportApi'], URL_CONSOLIDATED_LIST_REPORT)
  yield put(setIsFetchingReports(false))
}

function* getUsersHoursAuthUrl() {
  try {
    const URL = 'user-hours/get_auth_url/'
    const response = yield call([Api, 'getUsersHoursAuthUrl'], URL)
    const { status, data } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(getUsersHoursAuthUrlSuccess(data.google_auth_url))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Authentication URL have been successfully getting',
        delay: 5000,
      })
    )
  } catch (error) {
    yield put(
      showAlert({
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
      CHANGE_SELECTED_DATE_PROJECTS_REPORT,
      SET_SELECTED_DEVELOPER,
      CLEAR_SELECTED_DEVELOPER,
      SET_SELECTED_PROJECT_PROJECTREPORTS,
      CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
      GET_CONSOLIDATE_PROJECT_REPORT,
    ],
    handleGetConsolidatedReport
  )
  yield takeEvery(
    GET_ALL_DEVELOPER_PROJECTS,
    getAllDevelopersProjectInProjectReport
  )
  yield takeEvery(GET_USERS_PROJECT_REPORT, usersProjectReport)
  yield takeEvery(ADD_DEVELOPER_TO_PROJECT, addDevelopersToProject)
  yield takeEvery(
    [GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT],
    getDeveloperProjects
  )
  yield takeEvery(SET_EXCHANGE_RATES, setExchangeRate)
  yield takeLatest(GET_USERS_HOURS_AUTH_URL_REQUEST, getUsersHoursAuthUrl)
}
