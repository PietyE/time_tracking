import {
  GET_USERS_HOURS_TOKEN_REQUEST,
  GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
} from 'constants/google-auth-sucess-constants'
import { takeEvery, put, call, takeLeading, select } from 'redux-saga/effects'
import { isEmpty } from 'lodash'
import Api from 'utils/api'
import {
  getUsersHoursTokenError,
  getUsersHoursTokenSuccess,
  googleAuthAccessDenied,
  googleAuthChangeGoogleSheetLink,
  googleAuthErrorListToggle,
  googleAuthSyncGoogleSheetError,
  googleAuthSyncGoogleSheetSuccess,
} from 'actions/google-auth-success'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import {
  getGoogleSheetSyncInputLink,
  getSelectedDate,
  googleSheetSyncIsAgree,
} from 'selectors/google-auth-success'

// specific error if we receive from BE different users

const isUsersDifferentMessage =
  'Users are different in database and google sheet, please correct it'

function* createUsersHoursToken(action) {
  try {
    const url = 'user-hours/create_token/'

    const response = yield call(
      [Api, 'getUsersHoursCreateToken'],
      url,
      action.payload
    )

    const { status, data: error } = response

    if (!isEmpty(error.detail)) {
      yield put(googleAuthAccessDenied(error?.detail))
      throw new Error('Access denied')
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
    const date = yield select(getSelectedDate)

    const response = yield call([Api, 'syncWithGoogleSheet'], url, {
      spreadsheet,
      is_agree,
      ...date,
    })

    const { data: users } = response

    if (!isEmpty(users)) {
      yield put(googleAuthSyncGoogleSheetError(users.errors))
      throw new Error(isUsersDifferentMessage)
    }

    yield put(googleAuthSyncGoogleSheetSuccess())
    yield put(googleAuthChangeGoogleSheetLink(''))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Sync successfully done',
        delay: 3000,
      })
    )
  } catch (error) {
    if (error.message === isUsersDifferentMessage) {
      yield put(googleAuthErrorListToggle())
      yield put(
        showAlert({
          type: WARNING_ALERT,
          title: 'Something went wrong',
          message: error.message,
          delay: 6000,
        })
      )
    } else {
      yield put(googleAuthSyncGoogleSheetError())
      yield put(
        showAlert({
          type: WARNING_ALERT,
          title: 'Something went wrong',
          message: error.message || 'Something went wrong',
          delay: 3000,
        })
      )
    }
  }
}

export function* watchGoogleAuthCreateToken() {
  yield takeEvery(GET_USERS_HOURS_TOKEN_REQUEST, createUsersHoursToken)
  yield takeLeading(
    GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
    syncWithGoogleSheet
  )
}
