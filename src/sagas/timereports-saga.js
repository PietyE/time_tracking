import { select, call, takeEvery, put, delay } from 'redux-saga/effects'

import Api from 'utils/api'

import {
  CHANGE_SELECTED_DATE,
  ADD_TIME_REPORT,
  SELECT_PROJECT,
  GET_DEVELOPER_PROJECTS,
  DELETE_TIME_REPORT,
} from 'constants/actions-constant'
import { PAGE_SIZE } from 'constants/url-constant'
import { setTimeReports, setIsFetchingReports } from 'actions/timereports'
import { setDeveloperProjects } from 'actions/developer-projects'

/** Fake Data */
import { timereports, getId } from 'constants/fake-data'
/** Fake Data */

export function* getDeveloperProjects() {
  const URL_DEVELOPER_PROJECT = `developer-projects/?page_size=${PAGE_SIZE}`
  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)
  yield put(setDeveloperProjects(data))
}

export function* workerTimeReports() {
  try {
    const { selectedProject } = yield select(state => state.timereports)
    if (selectedProject) {
      yield put(setIsFetchingReports(true))
      // GET_DATA_FROM_SERVER! to do
      yield delay(1000)
      yield put(setTimeReports(timereports))
      yield put(setIsFetchingReports(false))
    }
  } catch (error) {}
}

export function* addTimeReport({ payload }) {
  const { reports } = yield select(state => state.timereports)
  const newTimereport = [...reports]
  newTimereport.push({
    id: getId(),
    text: payload.description,
    duration: payload.tookHours * 60,
    date: payload.date,
  })

  yield put(setTimeReports(newTimereport))
}

export function* deleteTimeReport({ payload: id }) {
  const { reports } = yield select(state => state.timereports)
  const newTimereport = reports.filter(item => item.id !== id)
  // newTimereport.push({
  //   id: getId(),
  //   text: payload.description,
  //   duration: payload.tookHours * 60,
  //   date: payload.date,
  // })

  yield put(setTimeReports(newTimereport))
}

export function* watchTimereports() {
  yield takeEvery(GET_DEVELOPER_PROJECTS, getDeveloperProjects)
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(DELETE_TIME_REPORT, deleteTimeReport)
  yield takeEvery([SELECT_PROJECT, CHANGE_SELECTED_DATE], workerTimeReports)
}
