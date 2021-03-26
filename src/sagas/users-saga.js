import { put, call, takeEvery } from 'redux-saga/effects'
import Api from 'utils/api'
import { isEmpty } from 'lodash'
import {
  setUsersOauthData,
  cleanUserOauthData,
  setAuthStatus,
  setFetchingProfileStatus,
} from 'actions/users'
import { showAler } from 'actions/alert'
import { WARNING_ALERT, SUCCES_ALERT } from 'constants/alert-constant'
import {
  LOG_IN,
  LOG_OUT,
  BOOTSTRAP,
  SET_NEW_SALARY,
  SET_NEW_RATE,
  SET_NEW_COST,
  SET_NEW_COMMENT,
  SET_EDITED_COMMENT,
  SET_PROCESSED_STATUS,
  SET_EDITED_COST,
} from 'constants/actions-constant'
import { getDeveloperConsolidateProjectReport } from 'actions/projects-report'

function* bootstrap() {
  try {
    yield put(setFetchingProfileStatus(true))
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

        if (isEmpty(response)) {
          yield put(setAuthStatus(false))
          return false
        }

        const { data: usersDataFromServer, status } = response

        if (status !== 200) {
          return
        }

        yield put(setUsersOauthData({ ...usersDataFromServer, ...googleData }))
        yield put(setAuthStatus(true))
        return true
      }
    }

    yield put(setAuthStatus(false))
  } catch (error) {
    //to do
  } finally {
    yield put(setFetchingProfileStatus(false))
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
      if (status !== 200) {
        throw new Error()
      }
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
  } finally {
    yield put(cleanUserOauthData())
    yield put(setAuthStatus(false))
    yield call([localStorage, 'clear'])
  }
}

function* setUserSalary({ payload }) {
  try {
    const URL = 'users/salary/'
    yield call([Api, 'saveNewSalary'], URL, payload)

    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Salary has been changed',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setUserRate({ payload }) {
  try {
    const URL = 'users/rate/'
    yield call([Api, 'saveNewRate'], URL, payload)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Rate has been changed',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setUserCost({ payload }) {
  try {
    const URL = 'expenses/'
    yield call([Api, 'saveNewCost'], URL, payload)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Cost has been create',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setEditedCost({ payload }) {
  try {
    const { expenseId, ...data } = payload
    const URL = `expenses/${expenseId}/`
    yield call([Api, 'saveEditedCost'], URL, data)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Cost has been edited',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setUserComment({ payload }) {
  try {
    const URL = 'comments/'
    yield call([Api, 'saveNewComments'], URL, payload)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Comment has been created',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setEditedComment({ payload }) {
  try {
    const { commentId, ...data } = payload
    const URL = `comments/${commentId}`
    yield call([Api, 'saveEditedComments'], URL, data)
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'Comment has been edited',
        delay: 5000,
      })
    )
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

function* setProcessedStatus({ payload }) {
  try {
    const { userId, month, year } = payload
    const URL = `users/${userId}/toggle-processed-status/${year}/${month + 1}/`
    yield call([Api, 'toggleProcessedStatus'], URL)
    yield put(getDeveloperConsolidateProjectReport())
  } catch (error) {
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

export function* watchGetUserAsync() {
  yield takeEvery(BOOTSTRAP, bootstrap)
  yield takeEvery(LOG_IN, logIn)
  yield takeEvery(LOG_OUT, logOut)
  yield takeEvery(SET_NEW_SALARY, setUserSalary)
  yield takeEvery(SET_NEW_RATE, setUserRate)
  yield takeEvery(SET_NEW_COST, setUserCost)
  yield takeEvery(SET_EDITED_COST, setEditedCost)
  yield takeEvery(SET_NEW_COMMENT, setUserComment)
  yield takeEvery(SET_EDITED_COMMENT, setEditedComment)
  yield takeEvery(SET_PROCESSED_STATUS, setProcessedStatus)
}
