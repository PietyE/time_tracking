import {
  VILMATES_PAGE_GET_USERS_LIST_ERROR,
  VILMATES_PAGE_GET_USERS_LIST_REQUEST,
  VILMATES_PAGE_GET_USERS_LIST_SUCCESS,
  VILMATES_PAGE_SELECT_USER_ERROR,
  VILMATES_PAGE_SELECT_USER_REQUEST,
  VILMATES_PAGE_SELECT_USER_SUCCESS,
} from 'constants/vilmates-page'

const initialState = {
  isLoading: true,
  users: [],
  error: '',
  singlePage: {
    isLoading: true,
    selectedUser: '',
  },
}

export const vilmatesPage = (state = initialState, action) => {
  switch (action.type) {
    case VILMATES_PAGE_GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      }
    case VILMATES_PAGE_GET_USERS_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case VILMATES_PAGE_SELECT_USER_SUCCESS:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          isLoading: false,
          selectedUser: action.payload,
        },
      }
    case VILMATES_PAGE_SELECT_USER_ERROR:
      return {
        ...state,
        singlePage: {
          ...state.singlePage,
          isLoading: false,
        },
      }
    default:
      return state
  }
}
