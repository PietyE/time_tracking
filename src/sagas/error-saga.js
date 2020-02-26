import { select, call, takeEvery, put } from 'redux-saga/effects'

import { SET_ERROR_DATA } from 'constants/actions-constant'
import { DANGER_ALERT } from 'constants/alert-constant'
import { cleanErrorData } from 'actions/error'
import { showAler } from 'actions/alert'
import { setAuthStatus } from 'actions/users'

export function* errorHandler() {
  const { status, messages, detail } = yield select(state => state.error)

  switch (status) {
    case 401:
      yield call([localStorage, 'clear'])
      yield put(setAuthStatus(false))
      yield put(
        showAler({
          type: DANGER_ALERT,
          message: detail || messages || 'Something went wrong',
          delay: 5000,
        })
      )
      yield put(cleanErrorData())
      break
    case 404:
      yield put(
        showAler({
          type: DANGER_ALERT,
          title: 'Page not found',
          message: 'This is not the page you were looking for.',
          delay: 5000,
        })
      )
      yield put(cleanErrorData())
      break
    case 500:
      yield put(
        showAler({
          type: DANGER_ALERT,
          title: 'Page not found',
          message: 'This is not the page you were looking for.',
          delay: 5000,
        })
      )
      break
    default:
      yield put(
        showAler({
          type: DANGER_ALERT,
          message: detail || messages || 'Something went wrong',
          delay: 5000,
        })
      )
      yield put(cleanErrorData())
  }
}

export function* watchErrorAlert() {
  yield takeEvery(SET_ERROR_DATA, errorHandler)
}
