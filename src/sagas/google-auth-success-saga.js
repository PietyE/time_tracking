import { GET_USERS_HOURS_TOKEN_REQUEST } from 'constants/google-auth-sucess-constants'
import { takeEvery, put, call } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  getUsersHoursTokenError,
  getUsersHoursTokenSuccess,
} from 'actions/google-auth-success'
import { showAler } from 'actions/alert'
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

    yield put(getUsersHoursTokenSuccess())
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Authentication successfully',
        delay: 4000,
      })
    )
  } catch (error) {
    yield put(getUsersHoursTokenError())
    yield put(
      showAler({
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
}
