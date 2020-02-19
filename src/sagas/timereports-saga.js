import { select, call, takeEvery, put, take } from 'redux-saga/effects'

import {
  CHANGE_SELECTED_DATE,
  ADD_TIME_REPORT,
} from 'constants/actions-constant'
import { setSelectedDate, setTimeReports } from 'actions/timereports'

/** Fake Data */
import { timereports, getId } from 'constants/fake-data'
/** Fake Data */

export function* workerTimeReports(payload) {
  yield put(setSelectedDate(payload))
  // GET_DATA_FROM_SERVER! to do
  yield put(setTimeReports(timereports))
}

export function* addTimeReport({ payload }) {
  const newTimereport = [...timereports]
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

  while (true) {
    const { payload } = yield take(CHANGE_SELECTED_DATE)
    yield call(workerTimeReports, payload)
  }
}
