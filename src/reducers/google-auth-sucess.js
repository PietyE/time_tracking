import {
  GET_USERS_HOURS_TOKEN_ERROR,
  GET_USERS_HOURS_TOKEN_REQUEST,
  GET_USERS_HOURS_TOKEN_SUCCESS,
  GOOGLE_AUTH_CHANGE_GOOGLE_SHEET_LINK,
  GOOGLE_AUTH_IS_ERROR_MODAL_TOGGLE,
  GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
  GOOGLE_AUTH_SYNC_GOOGLE_SHEET_ERROR,
  GOOGLE_AUTH_SYNC_GOOGLE_SHEET_SUCCESS,
} from 'constants/google-auth-sucess-constants'

const initialState = {
  isLoading: false,
  googleSheetLink: '',
  isAgree: false,
  isOpenErrorList: false,
  users: {},
}

export const googleAuthSuccess = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_HOURS_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_USERS_HOURS_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GET_USERS_HOURS_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    case GOOGLE_AUTH_CHANGE_GOOGLE_SHEET_LINK:
      return {
        ...state,
        googleSheetLink: action.payload,
      }
    case GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GOOGLE_AUTH_SYNC_GOOGLE_SHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case GOOGLE_AUTH_SYNC_GOOGLE_SHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      }
    case GOOGLE_AUTH_IS_ERROR_MODAL_TOGGLE:
      return {
        ...state,
        isOpenErrorList: !state.isOpenErrorList,
      }
    default:
      return state
  }
}
