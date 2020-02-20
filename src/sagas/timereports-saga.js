import { select, call, takeEvery, put, take } from 'redux-saga/effects'

import Api from 'utils/api'

import {
  CHANGE_SELECTED_DATE,
  ADD_TIME_REPORT,
} from 'constants/actions-constant'
import { PAGE_SIZE } from 'constants/url-constant'
import { setSelectedDate, setTimeReports } from 'actions/timereports'
import { setDeveloperProjects } from 'actions/developer-projects'

/** Fake Data */
import { timereports, getId } from 'constants/fake-data'
/** Fake Data */

export function* workerTimeReports({ payload }) {
  yield put(setSelectedDate(payload))

  const URL_DEVELOPER_PROJECT = `developer-projects/?page_size=${PAGE_SIZE}`

  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)
  yield put(setDeveloperProjects(data))

  // GET_DATA_FROM_SERVER! to do
  yield put(setTimeReports(timereports))
}

export function* addTimeReport({ payload }) {
  const { reports } = yield select(state => state.timereports)
  console.log('reports', reports)
  const newTimereport = [...reports]
  newTimereport.push({
    id: getId(),
    text: payload.description,
    duration: payload.tookHours * 60,
    date: payload.date,
  })

  yield put(setTimeReports(newTimereport))
}

export function* watchTimereports() {
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(CHANGE_SELECTED_DATE, workerTimeReports)
}
