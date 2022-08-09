import { put, takeEvery, call } from 'redux-saga/effects'
import {
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_SELECT_USER_REQUEST,
} from 'constants/vilmates-page'
import {
  vilmatesPageGetUsersListError,
  vilmatesPageGetUsersListSuccess,
  vilmatesPageSelectUserSuccess,
} from 'actions/vilmates-page'
import { showAlert } from 'actions/alert'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import Api from 'utils/api'

function* getUsersList() {
  try {
    const url = 'users/'
    const response = yield call([Api, 'users'], url)
    const { status, data: users } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageGetUsersListSuccess(users))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        title: 'Users successfully loaded',
        delay: 3000,
      })
    )
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
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        title: 'User successfully loaded',
        delay: 3000,
      })
    )
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

export function* watchUsersListGetRequest() {
  yield takeEvery(VILMATES_PAGE_GET_USERS_LIST_REQUEST, getUsersList)
  yield takeEvery(VILMATES_PAGE_SELECT_USER_REQUEST, getSelectedUser)
}
