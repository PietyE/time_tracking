import { put, takeEvery, call } from 'redux-saga/effects'
import {
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_SELECT_USER_REQUEST,
} from 'constants/vilmates-page'
import {
  vilmatesPageGetUsersListError,
  vilmatesPageGetUsersListSuccess,
  vilmatesPageSelectUserError,
  vilmatesPageSelectUserSuccess,
} from 'actions/vilmates-page'
import { showAlert } from 'actions/alert'
import { WARNING_ALERT } from 'constants/alert-constant'
import Api from 'utils/api'

function* getUsersList(action) {
  try {
    const url = `users/?search=${action.payload}`
    const response = yield call([Api, 'users'], url)
    const { status, data: users } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageGetUsersListSuccess(users))
  } catch (error) {
    yield put(vilmatesPageGetUsersListError())
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

function* getSelectedUser(action) {
  try {
    const url = `users/${action.payload}`
    const response = yield call([Api, 'users'], url)
    const { status, data: user } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageSelectUserSuccess(user))
  } catch (error) {
    yield put(vilmatesPageSelectUserError())
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

export function* watchUsersListGetRequest() {
  yield takeEvery(VILMATES_PAGE_GET_USERS_LIST_REQUEST, getUsersList)
  yield takeEvery(VILMATES_PAGE_SELECT_USER_REQUEST, getSelectedUser)
}
