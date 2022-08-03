import {
  GET_USERS_HOURS_TOKEN_REQUEST,
  GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
} from 'constants/google-auth-sucess-constants'
import { takeEvery, put, call, takeLeading } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  getUsersHoursTokenError,
  getUsersHoursTokenSuccess,
} from 'actions/google-auth-success'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'

function* createUsersHoursToken(action) {
  try {
    const url = 'user-hours/create_token/'

    const response = yield call(
      [Api, 'getUsersHoursCreateToken'],
      url,
      action.payload
    )

    const { status } = response

    if (String(status)[0] !== '2') {
      throw new Error()
    }

    if (String(status) === '500') {
      throw new Error('First login with google drive button')
    }

    yield put(getUsersHoursTokenSuccess())
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Authentication successfully',
        delay: 4000,
      })
    )
  } catch (error) {
    yield put(getUsersHoursTokenError())
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 5000,
      })
    )
  }
}

function* syncWithGoogleSheet() {
  yield
}

export function* watchGoogleAuthCreateToken() {
  yield takeEvery(GET_USERS_HOURS_TOKEN_REQUEST, createUsersHoursToken)
  yield takeLeading(
    GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
    syncWithGoogleSheet
  )
}
