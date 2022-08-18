import { showAlert } from 'actions/alert'
import {
  vilmatesPageChangeUserOnProjectSuccess,
  vilmatesPageGetDeveloperProjectsListError,
  vilmatesPageGetDeveloperProjectsListSuccess,
  vilmatesPageGetUsersListError,
  vilmatesPageGetUsersListSuccess,
  vilmatesPageSelectUserError,
  vilmatesPageSelectUserSuccess,
} from 'actions/vilmates-page'
import { pm } from 'api'
import { WARNING_ALERT } from 'constants/alert-constant'
import {
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATE_PAGE_CHANGE_USER_ON_PROJECT_REQUEST,
} from 'constants/vilmates-page'
import { call, put, takeEvery } from 'redux-saga/effects'
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

function* getDeveloperProjectsList({ payload }) {
  try {
    const url = `developer-projects/?user_id=${payload}`
    const response = yield call([Api, 'developerProjects'], url)
    const { status, data: developerProjects } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageGetDeveloperProjectsListSuccess(developerProjects))
  } catch (error) {
    yield put(vilmatesPageGetDeveloperProjectsListError())
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

function* editUsersOnProject({ payload }) {
  try {
    const { developerProjectId, data } = payload

    const { status, data: editedDeveloperProjectData } = yield call(
      [pm, 'changeProjectTeam'],
      developerProjectId,
      data
    )
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(
      vilmatesPageChangeUserOnProjectSuccess(
        editedDeveloperProjectData,
        developerProjectId
      )
    )
  } catch (error) {
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
  yield takeEvery(
    VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
    getDeveloperProjectsList
  )
  yield takeEvery(
    VILMATE_PAGE_CHANGE_USER_ON_PROJECT_REQUEST,
    editUsersOnProject
  )
}
