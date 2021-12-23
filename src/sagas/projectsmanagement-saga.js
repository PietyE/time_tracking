import { call, takeEvery, put, select } from 'redux-saga/effects'
import { pm } from '../api'
import { saveAs } from 'file-saver'
import {
  GET_ALL_PROJECTS,
  GET_DOWNLOAD_PROJECT_REPORT,
  GET_PROJECT_REPORT_BY_ID,
  CREATE_PROJECT,
  CHANGE_PROJECT_NAME,
  CHANGE_USERS_ON_PROJECT,
  ADD_USERS_ON_PROJECT,
  GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT,
  SET_SELECTED_PM,
} from 'constants/actions-constant'
import {
  setAllProjects,
  setProjectsWithReport,
  setFetchingPmPage,
  setShownProject,
} from '../actions/projects-management'
import { showAler } from '../actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from '../constants/alert-constant'
import {
  getSelectedPmIdSelector,
  getSelectedProjectIdSelector,
  getShownProjectSelector,
} from '../reducers/projects-management'
import { isEmpty } from 'lodash'
import { getProjectInTimeReportSelector } from 'reducers/projects-report'
import { setErrorData } from 'actions/error'

export function* getAllProjects() {
  try {
    yield put(setFetchingPmPage(true))
    const selectedPmId = yield select(getSelectedPmIdSelector)
    if (selectedPmId) {
      if (selectedPmId === 'select-all') {
        const response = yield select(getProjectInTimeReportSelector)
        yield put(setAllProjects(response))
        const selectedProject = yield select(getShownProjectSelector)

        if (!isEmpty(selectedProject)) {
          const projectId = selectedProject?.id
          const currentProject = response.find((el) => el.id === projectId)
          yield put(setShownProject(currentProject))
        }
      }
      if (selectedPmId !== 'select-all') {
        const { month, year } = yield select(
          (state) => state.projectsManagement.selectedDateForPM
        )
        const response = yield call([pm, 'getProjectsTotalHours'], {
          month,
          year,
          selectedPmId,
        })
        yield put(setAllProjects(response.data))
        const selectedProject = yield select(getShownProjectSelector)

        if (!isEmpty(selectedProject)) {
          const projectId = selectedProject?.id
          const currentProject = response.data.find((el) => el.id === projectId)
          yield put(setShownProject(currentProject))
        }
      }
    }
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* getProjectsSagaWorker() {
  try {
    yield put(setFetchingPmPage(true))

    const selectPm = yield select(getSelectedPmIdSelector)

    let params = selectPm === 'select-all' ? {} : { user_id: selectPm }

    const { data } = yield call([pm, 'getProjectsApi'], params)

    yield put(setAllProjects(data))
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* getProjectReportById(action) {
  const { month, year } = yield select(
    (state) => state.projectsManagement.selectedDateForPM
  )
  try {
    yield put(setFetchingPmPage(true))
    let projectId = action?.payload

    if (!action) {
      const currentProjectId = yield select(getSelectedProjectIdSelector)
      projectId = currentProjectId
    }

    const { data } = yield call([pm, 'getProjectsReportById'], {
      year,
      month,
      id: `${projectId}`,
    })
    const usersReport = data.map((el) => ({
      projectReportId: el.id,
      projectId: el.project.id,
      userId: el.user.id,
      userName: el.user.name,
      minutes: el.total_minutes,
      is_full_time: el.is_full_time,
      is_active: el.is_active,
    }))
    const projectReport = {
      projectId: projectId,
      users: usersReport,
    }
    yield put(setProjectsWithReport(projectReport))
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* downloadProjectReport({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const { month, year } = yield select(
      (state) => state.projectsManagement.selectedDateForPM
    )

    const response = yield call([pm, 'getProjectReportInExcel'], {
      year,
      month,
      payload,
    })
    const fileName = response.headers['content-disposition'].split('"')[1]
    if (response && response.data instanceof Blob) {
      saveAs(response.data, fileName)
    }
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* downloadAllTeamProjectReport({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const { month, year } = yield select(
      (state) => state.projectsManagement.selectedDateForPM
    )

    const response = yield call([pm, 'getAllTeamProjectReportsInExcel'], {
      year,
      month,
      payload,
    })
    const fileName = response.headers['content-disposition'].split('"')[1]
    if (response && response.data instanceof Blob) {
      saveAs(response.data, fileName)
    }
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* createProject({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const { projectName, users } = payload
    // const { data } = pm.createProject({name: projectName})
    const { data } = yield call([pm, 'createProject'], { name: projectName })
    yield call([pm, 'setUsersToProject'], { project: data.id, users: users })
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Project has been created',
        delay: 5000,
      })
    )
    yield call(getAllProjects)
  } catch (error) {
    const { response = {}, message: error_message } = error

    const { data = {}, status, statusText } = response

    const { detail, title, non_field_errors, duration } = data
    const errorMessage =
      (title && title[0]) ||
      duration ||
      (non_field_errors && non_field_errors[0]) ||
      error_message ||
      statusText
    const errorData = {
      status,
      messages: errorMessage,
      detail: typeof data === 'object' ? detail : '',
    }

    yield put(setErrorData(errorData))
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* changeProjName({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const result = yield call([pm, 'changeProjectName'], payload.id, {
      name: payload.data,
    })
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project name has been modified',
          delay: 5000,
        })
      )
      yield call(getAllProjects)
    }
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* editUsersOnProject({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const { id, data } = payload
    const result = yield call([pm, 'changeProjectTeam'], id, data)
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project team has been modified',
          delay: 5000,
        })
      )
    }
    yield call(getProjectReportById)
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* addUsersToProject({ payload }) {
  try {
    yield put(setFetchingPmPage(true))
    const result = yield call([pm, 'createDeveloperProject'], payload.data)
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project team has been modified',
          delay: 5000,
        })
      )
    }
    yield call(getProjectReportById)
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

export function* watchProjectsManagement() {
  yield takeEvery(
    [GET_ALL_PROJECTS, SET_SELECTED_PM],
    getProjectsSagaWorker
    // getAllProjectsWithReport
  )
  yield takeEvery([GET_PROJECT_REPORT_BY_ID], getProjectReportById)
  yield takeEvery([GET_DOWNLOAD_PROJECT_REPORT], downloadProjectReport)
  yield takeEvery(
    [GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT],
    downloadAllTeamProjectReport
  )
  yield takeEvery([CREATE_PROJECT], createProject)
  yield takeEvery([CHANGE_PROJECT_NAME], changeProjName)
  yield takeEvery([CHANGE_USERS_ON_PROJECT], editUsersOnProject)
  yield takeEvery([ADD_USERS_ON_PROJECT], addUsersToProject)
}
