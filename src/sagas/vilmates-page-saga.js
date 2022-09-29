import { showAlert } from 'actions/alert'
import {
  vilmatesPageAddDeveloperProjectSuccess,
  vilmatesPageChangeUserOnProjectSuccess,
  vilmatesPageGetCommentsError,
  vilmatesPageGetCommentsSuccess,
  vilmatesPageGetDeveloperProjectsListError,
  vilmatesPageGetDeveloperProjectsListSuccess,
  vilmatesPageGetUsersListError,
  vilmatesPageGetUsersListSuccess,
  vilmatesPagePostCommentsError,
  vilmatesPagePostCommentsSuccess,
  vilmatesPageSelectUserError,
  vilmatesPageSelectUserSuccess,
} from 'actions/vilmates-page'
import { pm } from 'api'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import {
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATE_PAGE_ADD_DEVELOPER_PROJECT_REQUEST,
  VILMATE_PAGE_CHANGE_USER_ON_PROJECT_REQUEST,
  VILMATES_PAGE_GET_COMMENTS_REQUEST,
  VILMATES_PAGE_POST_COMMENT_REQUEST,
  VILMATES_SINGLE_PAGE_UPDATE_USER_PERSONAL_INFORMATION_REQUEST,
} from 'constants/vilmates-page'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from 'utils/api'

function* getUsersList(action) {
  try {
    const url = action.payload
      ? `users/?search=${action.payload}/`
      : `users/?search=${action.payload}`
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
    const url = `users/${action.payload}/`
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

// TODO: change endpoint from /developer-projects/report to /developer-projects
//       when "is_active" field will be added to developer project list
function* getDeveloperProjectsList({ payload }) {
  const { userId, year, month } = payload
  try {
    const url = `developer-projects/report/${year}/${month}/?user_id=${userId}`
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
        title: 'Project is not selected',
        message: error.message || 'Something went wrong',
        delay: 5000,
      })
    )
  }
}

function* postDeveloperProject({ payload }) {
  try {
    const { status, data: addedDeveloperProjects } = yield call(
      [pm, 'setUsersToProject'],
      payload
    )
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageAddDeveloperProjectSuccess(addedDeveloperProjects[0]))
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Project is not added',
        message: 'You have to set project owner first',
        delay: 5000,
      })
    )
  }
}

function* changeUserPersonalInformation(action) {
  const { id, email, phone, slack, date_of_birth } = action.payload
  const url = `users/${id}/`
  try {
    const response = yield call([Api, 'updateUserPersonalInformation'], url, {
      email,
      phone,
      slack,
      date_of_birth,
    })
    const { status } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        title: 'Success',
        message: 'Your information successfully has been changed',
        delay: 2000,
      })
    )
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Error',
        message: error.message || 'Your information has not been changed',
      })
    )
  }
}

function* getComments(action) {
  const url = `vilmate-comments/?user_id=${action.payload}&page_size=20`
  try {
    const response = yield call([Api, 'getComments'], url)
    const { status, data: comments } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    yield put(vilmatesPageGetCommentsSuccess(comments?.items))
  } catch (error) {
    yield put(vilmatesPageGetCommentsError())
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Comments have not been loaded',
        message: error.message || 'Something went wrong',
        delay: 3000,
      })
    )
  }
}

function* postComment(action) {
  const { userId: user, text } = action.payload
  const url = 'vilmate-comments/'
  try {
    const response = yield call([Api, 'postComment'], url, { user, text })
    const { status, data: comment } = response
    if (String(status)[0] !== '2') {
      throw new Error()
    }
    const date_create = new Date().toISOString()
    yield put(vilmatesPagePostCommentsSuccess({ ...comment, date_create }))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        title: 'Comment has been posted',
        message: 'You left a comment',
        delay: 2000,
      })
    )
  } catch (error) {
    yield put(vilmatesPagePostCommentsError())
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 2000,
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
  yield takeEvery(
    VILMATE_PAGE_ADD_DEVELOPER_PROJECT_REQUEST,
    postDeveloperProject
  )
  yield takeLatest(
    VILMATES_SINGLE_PAGE_UPDATE_USER_PERSONAL_INFORMATION_REQUEST,
    changeUserPersonalInformation
  )
  yield takeEvery(VILMATES_PAGE_GET_COMMENTS_REQUEST, getComments)
  yield takeLatest(VILMATES_PAGE_POST_COMMENT_REQUEST, postComment)
}
