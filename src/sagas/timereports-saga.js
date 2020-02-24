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
    const { selectedProject, selectedDate } = yield select(
      state => state.timereports
    )

    const URL_WORK_ITEMS = `work_items/?developer_project=${selectedProject}&year=${selectedDate['year']}&month=${selectedDate['month']}`
    if (selectedProject) {
      yield put(setIsFetchingReports(true))
      // GET_DATA_FROM_SERVER! to do
      const { data } = yield call([Api, 'getWorkItems'], URL_WORK_ITEMS)
      // yield delay(1000)

      yield put(setTimeReports(data))
      yield put(setIsFetchingReports(false))
    }
  } catch (error) {}
}

export function* addTimeReport({ payload }) {
  const { selectedProject, selectedDate } = yield select(
    state => state.timereports
  )

  const URL_WORK_ITEMS = `work_items/`
  const { reports } = yield select(state => state.timereports)
  const newTimereport = [...reports.items]

  var date = new Date(payload.date) // Date 2011-05-09T06:08:45.178Z
  var year = date.getFullYear()
  var month = ('0' + (date.getMonth() + 1)).slice(-2)
  var day = ('0' + date.getDate()).slice(-2)

  console.log(`${year}-${month}-${day}`) // 2011-05-09

  const body = {
    id: selectedProject,
    developer_project: '4893c4e3-c6e1-45b1-bebd-aa2fb6f8880f',
    title: payload.description,
    duration: payload.tookHours,
    date: `${year}-${month}-${day}`,
  }

  console.log('payload.date', payload.date)

  const { data } = yield call([Api, 'addWorkItem'], URL_WORK_ITEMS, body)
  console.log('data create', data)
  // newTimereport.push({
  //   id: getId(),
  //   text: payload.description,
  //   duration: payload.tookHours,
  //   date: payload.date,
  // })

  //yield put(setTimeReports(newTimereport))
}

export function* deleteTimeReport({ payload: id }) {
  const { reports } = yield select(state => state.timereports)
  const newTimereport = reports.filter(item => item.id !== id)

  yield put(setTimeReports(newTimereport))
}

export function* watchTimereports() {
  yield takeEvery(GET_DEVELOPER_PROJECTS, getDeveloperProjects)
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(DELETE_TIME_REPORT, deleteTimeReport)
  yield takeEvery([SELECT_PROJECT, CHANGE_SELECTED_DATE], workerTimeReports)
}
