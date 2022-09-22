import {
  GET_USERS_HOURS_TOKEN_ERROR,
  GET_USERS_HOURS_TOKEN_REQUEST,
  GET_USERS_HOURS_TOKEN_SUCCESS,
  GOOGLE_AUTH_CHANGE_GOOGLE_SHEET_LINK,
  GOOGLE_AUTH_CHANGE_SELECTED_DATE_MONTH,
  GOOGLE_AUTH_ERROR_ACCESS_DENIED,
  GOOGLE_AUTH_IS_AGREE_FALSE,
  GOOGLE_AUTH_IS_AGREE_TRUE,
  GOOGLE_AUTH_IS_ERROR_MODAL_TOGGLE,
  GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
  GOOGLE_AUTH_SYNC_GOOGLE_SHEET_ERROR,
  GOOGLE_AUTH_SYNC_GOOGLE_SHEET_SUCCESS,
} from 'constants/google-auth-sucess-constants'

const todayDate = new Date()

const initialState = {
  isLoading: false,
  googleSheetLink: '',
  isAgree: false,
  isOpenErrorList: false,
  users: {
    in_db: [],
    in_sheet: [],
  },
  errorAccess: false,
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
}

export const googleAuthSuccess = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_HOURS_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorAccess: false,
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
        users: {
          in_db: initialState.users.in_db,
          in_sheet: initialState.users.in_sheet,
        },
      }
    case GOOGLE_AUTH_SYNC_GOOGLE_SHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        users: {
          ...state.users,
          ...action.payload,
        },
      }
    case GOOGLE_AUTH_IS_ERROR_MODAL_TOGGLE:
      return {
        ...state,
        isOpenErrorList: !state.isOpenErrorList,
      }
    case GOOGLE_AUTH_ERROR_ACCESS_DENIED:
      return {
        ...state,
        errorAccess: action.payload,
      }
    case GOOGLE_AUTH_CHANGE_SELECTED_DATE_MONTH:
      return { ...state, selectedDate: action.payload + 1 }
    case GOOGLE_AUTH_IS_AGREE_TRUE:
      return {
        ...state,
        isAgree: true,
      }
    case GOOGLE_AUTH_IS_AGREE_FALSE:
      return {
        ...state,
        isAgree: false,
      }
    default:
      return state
  }
}
