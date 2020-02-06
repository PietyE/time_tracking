import { put, call, takeEvery } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  setUsersOauthData,
  cleanUserOauthData,
  setAuthStatus,
} from 'actions/users'
import { showAler } from 'actions/alert'
import { LOG_IN, LOG_OUT, BOOTSTRAP } from 'constants/actions-constant'
import { DANGER_ALERT, WARNING_ALERT } from 'constants/alert-constant'

function* bootstrap() {
  try {
    const user_auth_data = yield call(
      [localStorage, 'getItem'],
      'user_auth_data'
    )

    if (user_auth_data) {
      const data_user = JSON.parse(user_auth_data)

      const {
        key: access_token,
        expiration_timestamp: expires_at,
        user: id,
        date_create,
        ...googleData
      } = data_user

      const nowTime = Math.floor(new Date().getTime() / 1000)

      if (access_token && expires_at && nowTime < expires_at) {
        const URL = `users/${id}/`

        const response = yield call([Api, 'users'], URL)
        const { data: usersDataFromServer } = response

        yield put(setUsersOauthData({ ...usersDataFromServer, ...googleData }))
        yield put(setAuthStatus(true))
        return true
      }
    }
    yield put(setAuthStatus(false))
  } catch (error) {
    yield put(setAuthStatus(false))
    yield put(
      showAler({
        type: DANGER_ALERT,
        message: 'Something went wrong',
        delay: 5000,
      })
    )
  }
}

function* logIn({ payload: googleData }) {
  try {
    const url = 'users/auth/social/google/authorize/'

    if (typeof googleData === 'object' && googleData) {
      if (googleData.error) {
        throw new Error(googleData.error)
      }

      const google_token = googleData.tokenId

      const response = yield call([Api, 'login'], url, google_token)

      const { data, status } = response
      const { user, token } = data

      const userObjforState = {
        ...user,
        name: googleData.profileObj.name,
        imageUrl: googleData.profileObj.imageUrl,
      }

      const userObjforLocalStorage = {
        ...token,
        name: googleData.profileObj.name,
        imageUrl: googleData.profileObj.imageUrl,
      }

      yield put(setUsersOauthData(userObjforState))
      yield put(setAuthStatus(true))

      const authData = JSON.stringify(userObjforLocalStorage)

      yield call([localStorage, 'setItem'], 'user_auth_data', authData)
    } else {
      throw new Error()
    }
  } catch (error) {
    yield put(setAuthStatus(false))
    yield put(
      showAler({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

function* logOut() {
  try {
    const url = 'users/auth/logout/'
    yield call([Api, 'logout'], url)
  } catch (error) {
    yield put(
      showAler({
        type: DANGER_ALERT,
        message: 'Something went wrong',
        delay: 3000,
      })
    )
  } finally {
    yield put(cleanUserOauthData())
    yield put(setAuthStatus(false))
    yield call([localStorage, 'clear'])
  }
}

export function* watchGetUserAsync() {
  yield takeEvery(BOOTSTRAP, bootstrap)
  yield takeEvery(LOG_IN, logIn)
  yield takeEvery(LOG_OUT, logOut)
}
