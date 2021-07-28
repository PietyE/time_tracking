import {  call, takeEvery, put, select } from 'redux-saga/effects'
import Api from 'utils/api'
import {pm} from '../api'
import { saveAs } from 'file-saver'


import {
  GET_ALL_PROJECTS, GET_DOWNLOAD_PROJECT_REPORT, GET_PROJECT_REPORT_BY_ID, GET_USERS,
} from 'constants/actions-constant'
import { setAllProjects, setProjectsWithReport, } from '../actions/projects-management'
import { setUsers } from '../actions/projects-management'


export function* getAllProjects() {
  const URL_PROJECTS = `projects/`
  const { data } = yield call([Api, 'getAllProjects'], URL_PROJECTS)
  yield put(setAllProjects(data))
}

export function* getProjectReportById({payload}) {
  const { month, year } = yield select((state) => state.projectsManagement.selectedDateForPM)

  const { data } = yield call([pm, 'getProjectsReportById'], { year, month, id: `${payload}` })
  console.log('data', data)
  const usersReport = data.map(el => ({
      projectReportId: el.id,
      projectId: el.project.id,
      userId: el.user.id,
      userName: el.user.name,
      hours: el.hours,
      is_fulltime: el.is_fulltime,
    }),
  )
  const projectReport = {
    projectId: payload,
    users: usersReport,
  }
  yield put(setProjectsWithReport(projectReport))
}

export function* downloadProjectReport({payload}) {
  try {
    const { month, year } = yield select((state) => state.projectsManagement.selectedDateForPM)

    const response = yield call([pm, 'getProjectReportInExcel'], {year, month, payload})
    const fileName = response.headers['content-disposition'].split('"')[1]
    if (response && response.data instanceof Blob) {
      saveAs(response.data, fileName)
    }
  } catch (error) {
    console.log('!error', error)
  }
}

export function* getUsers() {
  const { data } = yield call([pm, 'getUsers'])
  console.log('data', data)
  yield put(setUsers(data))
}

export function* watchProjectsManagement() {
  yield takeEvery(
    [GET_ALL_PROJECTS],
    getAllProjects,
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
    [GET_USERS],
    getUsers,
  )
}