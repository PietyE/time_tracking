import { select, call, takeEvery, put } from 'redux-saga/effects'

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

    if (selectedProject) {
      const { developer_project_id } = selectedProject
      const { year, month } = selectedDate
      const URL_WORK_ITEMS = `work_items/?developer_project=${developer_project_id}&year=${year}&month=${1 +
        month}`
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

  const body = {
    id: selectedProject.id,
    developer_project: selectedProject.developer_project_id,
    title: payload.description,
    duration: payload.tookHours,
    date: payload.date,
  }

  const { data } = yield call([Api, 'addWorkItem'], URL_WORK_ITEMS, body)

  newTimereport.push({
    id: data.id,
    title: data.title,
    duration: data.duration,
    date: data.date,
  })

  yield put(setTimeReports({ items: newTimereport }))
}

export function* deleteTimeReport({ payload: id }) {
  const URL = `work_items/${id}`
  const {
    reports: { items },
  } = yield select(state => state.timereports)
  const newTimereport = items.filter(item => item.id !== id)
  const { status } = yield call([Api, 'deleteWorkItem'], URL)
  if (status === 204) {
    yield put(setTimeReports({ items: newTimereport }))
  }
}

export function* watchTimereports() {
  yield takeEvery(GET_DEVELOPER_PROJECTS, getDeveloperProjects)
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(DELETE_TIME_REPORT, deleteTimeReport)
  yield takeEvery([SELECT_PROJECT, CHANGE_SELECTED_DATE], workerTimeReports)
}
