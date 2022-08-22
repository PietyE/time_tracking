import {
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  VILMATES_PAGE_SELECT_USER_ERROR,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATES_PAGE_SELECT_USER_SUCCESS,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS,
  VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_ERROR
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

export const vilmatesPageGetDeveloperProjectsListRequest = (user_id) => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_REQUEST,
  payload: user_id
})

export const vilmatesPageGetDeveloperProjectsListSuccess = (developerProjects) => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_SUCCESS,
  payload: developerProjects
})

export const vilmatesPageGetDeveloperProjectsListError = () => ({
  type: VILMATES_PAGE_GET_DEVELOPER_PROJECTS_LIST_ERROR,
})
