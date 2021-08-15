import { call, takeEvery, put, select } from 'redux-saga/effects'
import Api from 'utils/api'
import { pm } from '../api'
import { saveAs } from 'file-saver'
import {
  GET_ALL_PROJECTS, GET_DOWNLOAD_PROJECT_REPORT, GET_PROJECT_REPORT_BY_ID, CREATE_PROJECT,
  CHANGE_PROJECT_NAME, CHANGE_USERS_ON_PROJECT, ADD_USERS_ON_PROJECT,
} from 'constants/actions-constant'
import { setAllProjects, setProjectsWithReport } from '../actions/projects-management'
// import { setUsers } from '../actions/projects-management'
import { showAler } from '../actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from '../constants/alert-constant'
import { getSelectedProjectIdSelector } from '../reducers/projects-management'


export function* getAllProjects() {
  try {
    const URL_PROJECTS = `projects/`
    const { data } = yield call([Api, 'getAllProjects'], URL_PROJECTS)
    yield put(setAllProjects(data))
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      }),
    )
  }

}

export function* getProjectReportById(action) {
  const { month, year } = yield select((state) => state.projectsManagement.selectedDateForPM)
  try {
    let projectId = action?.payload

    if (!action) {
      const currentProjectId = yield select(getSelectedProjectIdSelector)
      projectId = currentProjectId
    }

    const { data } = yield call([pm, 'getProjectsReportById'], { year, month, id: `${projectId}` })
    const usersReport = data.map(el => ({
        projectReportId: el.id,
        projectId: el.project.id,
        userId: el.user.id,
        userName: el.user.name,
        hours: el.hours,
        is_full_time: el.is_full_time,
        is_active: el.is_active,
      }),
    )
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
      }),
    )
    console.dir(error)
  }
}

export function* downloadProjectReport({ payload }) {
  try {
    const { month, year } = yield select((state) => state.projectsManagement.selectedDateForPM)

    const response = yield call([pm, 'getProjectReportInExcel'], { year, month, payload })
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
      }),
    )
    console.dir(error)
  }
}

export function* createProject({ payload }) {
  try {
    const { projectName, users } = payload
    const { data } = yield call([pm, 'createProject'], { name: projectName })
    yield call([pm, 'setUsersToProject'],
      { project: data.id, users: users })
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Project has been created',
        delay: 5000,
      }),
    )
    yield call(getAllProjects)
  } catch (error) {
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      }),
    )
    console.dir(error)
  }
}


export function* changeProjName({ payload }) {
  try {
    console.log('payload', payload)
    const result = yield call([pm, 'changeProjectName'], payload.id, { name: payload.data })
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project name has been modify',
          delay: 5000,
        }),
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
      }),
    )
    console.dir(error)
  }
}

export function* editUsersOnProject({ payload }) {
  try {
    const { id, data } = payload
    const result = yield call([pm, 'changeProjectTeam'], id, data)
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project team has been modify',
          delay: 5000,
        }),
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
      }),
    )
    console.dir(error)
  }
}

export function* addUsersToProject({ payload }) {
  try {
    console.log('payload', payload)
    const result = yield call([pm, 'createDeveloperProject'], payload.data)
    if (result.status === 200) {
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'Project team has been modify',
          delay: 5000,
        }),
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
      }),
    )
    console.dir(error)
  }
}


export function* watchProjectsManagement() {
  yield takeEvery(
    [GET_ALL_PROJECTS],
    getAllProjects,
    // getAllProjectsWithReport
  )
  yield  takeEvery(
    [GET_PROJECT_REPORT_BY_ID],
    getProjectReportById,
  )
  yield  takeEvery(
    [GET_DOWNLOAD_PROJECT_REPORT],
    downloadProjectReport,
  )
  yield  takeEvery(
    [CREATE_PROJECT],
    createProject,
  )
  yield takeEvery(
    [CHANGE_PROJECT_NAME], changeProjName)
  yield takeEvery(
    [CHANGE_USERS_ON_PROJECT], editUsersOnProject)
  yield takeEvery(
    [ADD_USERS_ON_PROJECT], addUsersToProject)
}

