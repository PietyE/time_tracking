import { call, delay, put, select, takeEvery } from 'redux-saga/effects'
import { pm } from '../api'
import { saveAs } from 'file-saver'
import {
  ADD_PROJECT_OWNER_TO_PROJECT,
  ADD_USERS_ON_PROJECT,
  CHANGE_PROJECT_NAME,
  CHANGE_PROJECT_OWNER,
  CHANGE_USERS_ON_PROJECT,
  CREATE_PROJECT,
  GET_ALL_PROJECTS,
  GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT,
  GET_DOWNLOAD_PROJECT_REPORT,
  GET_PROJECT_REPORT_BY_ID,
  SET_SELECTED_PM,
  USER_ADDED_FAILED,
  USER_ADDED_SUCCESSFULLY,
} from 'constants/actions-constant'
import {
  setAllProjects,
  setFetchingPmPage,
  setProjectsWithReport,
  setSelectedProjectId,
  setShowEditModal,
  setShownProject,
} from 'actions/projects-management'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import {
  getSelectedPmIdSelector,
  getSelectedProjectIdSelector,
  getShownProjectSelector,
} from 'reducers/projects-management'
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
      showAlert({
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

    let selectedPmId = selectPm === 'select-all' ? undefined : selectPm
    const { month, year } = yield select(
      (state) => state.projectsManagement.selectedDateForPM
    )
    const response = yield call([pm, 'getProjectsTotalHours'], {
      month,
      year,
      user_id: selectedPmId,
    })

    yield put(setAllProjects(response.data))

    // const { data } = yield call([pm, 'getProjectsApi'], params)
    //
    // yield put(setAllProjects(data))
  } catch (error) {
    yield put(
      showAlert({
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
  //todo: delay to fix bug should be found new approach to rewrite this logic
  yield delay(500)
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
      is_project_manager: el.is_project_manager,
    }))
    const projectReport = {
      projectId: projectId,
      users: usersReport,
    }
    yield put(setProjectsWithReport(projectReport))
  } catch (error) {
    yield put(
      showAlert({
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
      showAlert({
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
      showAlert({
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
    const { projectName } = payload
    const { data } = yield call([pm, 'createProject'], { name: projectName })
    yield put(setSelectedProjectId(data.id))
    yield call(getAllProjects)
    yield put(setShowEditModal(true))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Project has been created',
        delay: 5000,
      })
    )
    yield call(getProjectsSagaWorker)
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
    const result = yield call(
      [pm, 'changeProjectName'],
      payload.id,
      payload.data
    )
    if (result.status === 200) {
      yield put(
        showAlert({
          type: SUCCES_ALERT,
          message: `Project ${payload.title} has been modify`,
          delay: 5000,
        })
      )
      // yield call(getAllProjects)
    }
  } catch (error) {
    yield put(
      showAlert({
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
    let result
    yield put(setFetchingPmPage(true))
    const { id, data, selectedData } = payload
    if (selectedData) {
      const { month, year } = selectedData
      result = yield call([pm, 'changeProjectTeam'], id, {
        ...data,
        month: month + 1,
        year,
      })
    } else {
      result = yield call([pm, 'changeProjectTeam'], id, {
        ...data,
      })
    }
    if (result.status === 200) {
      yield put(
        showAlert({
          type: SUCCES_ALERT,
          message: 'Project team has been modified',
          delay: 5000,
        })
      )
      yield put({ type: USER_ADDED_SUCCESSFULLY })
    }
    yield call(getProjectReportById)
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
    yield put({ type: USER_ADDED_FAILED })
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
        showAlert({
          type: SUCCES_ALERT,
          message: 'Project team has been modify',
          delay: 5000,
        })
      )
    }
    yield call(getProjectReportById)
  } catch (error) {
    yield put(
      showAlert({
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

export function* changeProjectOwner(action) {
  const { currentProjectId, ownerId } = action.payload
  try {
    yield put(setFetchingPmPage(true))
    yield call([pm, 'changeProjectName'], currentProjectId, {
      owner: ownerId,
    })
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        title: 'Project owner successfully has been changed',
        message: 'Success',
        delay: 3000,
      })
    )
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Project owner has not been changed',
        message: error.message || 'Something went wrong',
        delay: 3000,
      })
    )
  } finally {
    yield put(setFetchingPmPage(false))
  }
}

function* addProjectOwnerToProject(action) {
  const { projectId, projectOwnerId } = action.payload
  try {
    yield put(setFetchingPmPage(true))
    yield call([pm, 'changeProjectName'], projectId, { owner: projectOwnerId })
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Project team has been modify',
        delay: 3000,
      })
    )
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 3000,
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
  yield takeEvery([CHANGE_PROJECT_OWNER], changeProjectOwner)
  yield takeEvery(ADD_PROJECT_OWNER_TO_PROJECT, addProjectOwnerToProject)
}
