import {
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
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
