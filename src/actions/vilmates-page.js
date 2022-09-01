import {
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_ERROR,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS,
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  VILMATES_PAGE_SELECT_USER_ERROR,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATES_PAGE_SELECT_USER_SUCCESS,
  VILMATE_PAGE_ADD_DEVELOPER_PROJECT_REQUEST,
  VILMATE_PAGE_ADD_DEVELOPER_PROJECT_SUCCESS,
  VILMATE_PAGE_CHANGE_USER_ON_PROJECT_REQUEST,
  VILMATE_PAGE_CHANGE_USER_ON_PROJECT_SUCCESS,
  VILMATES_PAGE_GET_COMMENTS_REQUEST,
  VILMATES_PAGE_GET_COMMENTS_SUCCESS,
  VILMATES_PAGE_GET_COMMENTS_ERROR,
} from 'constants/vilmates-page'

export const vilmatesPageGetUsersListRequest = (searchWord) => ({
  type: VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  payload: searchWord,
})

export const vilmatesPageGetUsersListSuccess = (users) => ({
  type: VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  payload: users,
})

export const vilmatesPageGetUsersListError = () => ({
  type: VILMATES_PAGE_GET_USERS_LIST_ERROR,
})

export const vilmatesPageSelectUserRequest = (id) => ({
  type: VILMATES_PAGE_SELECT_USER_REQUEST,
  payload: id,
})

export const vilmatesPageSelectUserSuccess = (user) => ({
  type: VILMATES_PAGE_SELECT_USER_SUCCESS,
  payload: user,
})

export const vilmatesPageSelectUserError = () => ({
  type: VILMATES_PAGE_SELECT_USER_ERROR,
})

export const vilmatesPageGetDeveloperProjectsListRequest = (
  userId,
  year,
  month
) => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  payload: { userId, year, month },
})

export const vilmatesPageGetDeveloperProjectsListSuccess = (
  developerProjects
) => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS,
  payload: developerProjects,
})

export const vilmatesPageGetDeveloperProjectsListError = () => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_ERROR,
})

export const vilmatesPageChangeUserOnProjectRequest = (payload) => ({
  type: VILMATE_PAGE_CHANGE_USER_ON_PROJECT_REQUEST,
  payload,
})

export const vilmatesPageChangeUserOnProjectSuccess = (
  changedDeveloperProjectData,
  developerProjectId
) => ({
  type: VILMATE_PAGE_CHANGE_USER_ON_PROJECT_SUCCESS,
  payload: { changedDeveloperProjectData, developerProjectId },
})

export const vilmatesPageAddDeveloperProjectRequest = (payload) => ({
  type: VILMATE_PAGE_ADD_DEVELOPER_PROJECT_REQUEST,
  payload: payload,
})

export const vilmatesPageAddDeveloperProjectSuccess = (payload) => ({
  type: VILMATE_PAGE_ADD_DEVELOPER_PROJECT_SUCCESS,
  payload: payload,
})

export const vilmatesPageGetCommentsRequest = (userId) => ({
  type: VILMATES_PAGE_GET_COMMENTS_REQUEST,
  payload: userId,
})

export const vilmatesPageGetCommentsSuccess = (comments) => ({
  type: VILMATES_PAGE_GET_COMMENTS_SUCCESS,
  payload: comments,
})

export const vilmatesPageGetCommentsError = () => ({
  type: VILMATES_PAGE_GET_COMMENTS_ERROR,
})
