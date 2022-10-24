import { put, call, takeEvery, select } from 'redux-saga/effects'
import Api from 'utils/api'
import api, { users } from 'api'
import { isEmpty } from 'lodash'
import {
  setUsersOauthData,
  cleanUserOauthData,
  setAuthStatus,
  setFetchingProfileStatus,
  setAuthInProgress,
  unsetAuthInProgress,
} from 'actions/users'
import {
  getConsolidateProjectReport,
  setIsFetchingReports,
} from 'actions/projects-report'
import { showAlert } from 'actions/alert'
import {
  WARNING_ALERT,
  SUCCES_ALERT,
  DANGER_ALERT,
} from 'constants/alert-constant'
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
  LOG_IN_WITH_CREDENTIALS,
  SET_AUTH_IN_PROGRESS,
  UNSET_AUTH_IN_PROGRESS,
} from 'constants/actions-constant'
import { getAuthInProgressSelector } from 'reducers/profile'
import { clearPmPageState } from 'actions/projects-management'

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
        ...googleData
      } = data_user

      const nowTime = Math.floor(new Date().getTime() / 1000)

      if (access_token && expires_at && nowTime < expires_at) {
        yield call([api, 'setToken'], access_token)

        const response = yield call([users, 'one'], id)

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
    if (typeof googleData === 'object' && googleData) {
      if (googleData.error) {
        if (googleData.error === 'popup_closed_by_user') {
          throw new Error('Popup closed by user')
        } else {
          throw new Error(googleData.error)
        }
      }

      const google_token = googleData.tokenId
      yield call([api, 'deleteToken'])
      const response = yield call([users, 'googleAuth'], {
        token: google_token,
      })

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

      console.log(userObjforState)

      yield put(setUsersOauthData(userObjforState))
      yield put(setAuthStatus(true))
      yield put(clearPmPageState())

      const authData = JSON.stringify(userObjforLocalStorage)
      yield call([localStorage, 'setItem'], 'user_auth_data', authData)
      yield call([api, 'setToken'], userObjforLocalStorage.key)
    } else {
      throw new Error()
    }
  } catch (error) {
    yield put(setAuthStatus(false))
    if (
      googleData.details !== 'Cookies are not enabled in current environment.'
    ) {
      yield put(
        showAlert({
          type: WARNING_ALERT,
          title: 'Something went wrong',
          message: error.message || 'Something went wrong',
          delay: 6000,
        })
      )
    }
  }
}

function* handleLoginWithCreds(userData) {
  const isAuthInProgress = yield select(getAuthInProgressSelector)
  yield call([api, 'deleteToken'])
  if (isAuthInProgress) {
    return
  }
  yield put(setAuthInProgress())
  const { payload, callback } = userData
  try {
    const response = yield call([users, 'logInWithCredentials'], payload)

    const { data, status } = response
    const { user, token } = data
    if (status !== 200) {
      throw new Error()
    }
    const userObjforState = {
      ...user,
    }

    const userObjforLocalStorage = {
      ...token,
      name: user.name,
    }

    yield put(setUsersOauthData(userObjforState))
    yield put(setAuthStatus(true))
    yield put(clearPmPageState())

    const authData = JSON.stringify(userObjforLocalStorage)

    yield call([localStorage, 'setItem'], 'user_auth_data', authData)
    yield call([api, 'setToken'], userObjforLocalStorage.key)
  } catch (error) {
    const credentialError = error?.response?.data?.non_field_errors[0]
    callback(false)
    yield put(setAuthStatus(false))
    yield put(
      showAlert({
        type: DANGER_ALERT,
        title: '',
        message: credentialError,
        delay: 6000,
      })
    )
  } finally {
    yield put(unsetAuthInProgress())
  }
}

function* logOut() {
  try {
    yield call([users, 'logOut'])
  } finally {
    yield put(cleanUserOauthData())
    yield call([localStorage, 'clear'])
    yield call([api, 'deleteToken'])
  }
}

function* setUserSalary({ payload }) {
  try {
    yield put(setIsFetchingReports(true))
    yield call([users, 'createUserSalary'], payload)
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Salary has been changed',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
    yield put(setIsFetchingReports(true))
    yield call([users, 'createUserRate'], payload)
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Rate has been changed',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
    yield put(setIsFetchingReports(true))
    yield call([users, 'toggleProcessedStatus'], payload)
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

/////////// ref
function* setUserCost({ payload }) {
  try {
    yield put(setIsFetchingReports(true))
    const URL = 'expenses/'
    const { status } = yield call([Api, 'saveNewCost'], URL, payload)
    if (status === 400) {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Cost has been create',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
    yield put(setIsFetchingReports(true))
    const { expenseId, ...data } = payload
    const URL = `expenses/${expenseId}/`
    const { status } = yield call([Api, 'saveEditedCost'], URL, data)
    if (status === 400) {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Cost has been edited',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
    yield put(setIsFetchingReports(true))
    const URL = 'comments/'
    const { status } = yield call([Api, 'saveNewComments'], URL, payload)
    if (status === 400) {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Comment has been created',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
    yield put(setIsFetchingReports(true))
    const { commentId, ...data } = payload
    const URL = `comments/${commentId}/`
    const { status } = yield call([Api, 'saveEditedComments'], URL, data)
    if (status === 400) {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'Comment has been edited',
        delay: 5000,
      })
    )
    yield put(setIsFetchingReports(false))
    yield put(getConsolidateProjectReport())
  } catch (error) {
    yield put(setIsFetchingReports(false))
    yield put(
      showAlert({
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
  yield takeEvery(LOG_IN_WITH_CREDENTIALS, handleLoginWithCreds)
  yield takeEvery(SET_NEW_SALARY, setUserSalary)
  yield takeEvery(SET_NEW_RATE, setUserRate)
  yield takeEvery(SET_NEW_COST, setUserCost)
  yield takeEvery(SET_EDITED_COST, setEditedCost)
  yield takeEvery(SET_NEW_COMMENT, setUserComment)
  yield takeEvery(SET_EDITED_COMMENT, setEditedComment)
  yield takeEvery(SET_PROCESSED_STATUS, setProcessedStatus)
  yield takeEvery(SET_AUTH_IN_PROGRESS, setAuthInProgress)
  yield takeEvery(UNSET_AUTH_IN_PROGRESS, unsetAuthInProgress)
}
