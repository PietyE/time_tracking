import {
  GET_USERS_HOURS_TOKEN_REQUEST,
  GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
} from 'constants/google-auth-sucess-constants'
import { takeEvery, put, call, takeLeading, select } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  getUsersHoursTokenError,
  getUsersHoursTokenSuccess,
  googleAuthSyncGoogleSheetError,
  googleAuthSyncGoogleSheetSuccess,
} from 'actions/google-auth-success'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import {
  getGoogleSheetSyncInputLink,
  googleSheetSyncIsAgree,
} from 'selectors/google-auth-success'

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
  try {
    const url = 'user-hours/sync_with_google_sheets/'
    const is_agree = yield select(googleSheetSyncIsAgree)
    const spreadsheet = yield select(getGoogleSheetSyncInputLink)

    const response = yield call([Api, 'syncWithGoogleSheet'], url, {
      spreadsheet,
      is_agree,
    })

    const { status } = response

    if (String(status)[0] !== '2') {
      throw new Error()
    }

    yield put(googleAuthSyncGoogleSheetSuccess())
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Authentication successfully',
        delay: 4000,
      })
    )
  } catch (error) {
    yield put(googleAuthSyncGoogleSheetError())
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

export function* watchGoogleAuthCreateToken() {
  yield takeEvery(GET_USERS_HOURS_TOKEN_REQUEST, createUsersHoursToken)
  yield takeLeading(
    GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
    syncWithGoogleSheet
  )
}
