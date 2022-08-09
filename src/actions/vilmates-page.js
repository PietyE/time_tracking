import {
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  VILMATES_PAGE_SELECT_USER_ERROR,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATES_PAGE_SELECT_USER_SUCCESS,
} from 'constants/vilmates-page'

export const vilmatesPageGetUsersListRequest = () => ({
  type: VILMATES_PAGE_GET_USERS_LIST_REQUEST,
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
