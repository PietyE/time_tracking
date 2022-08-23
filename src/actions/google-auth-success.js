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

export const getUsersHoursTokenRequest = (googleDriveAuth) => ({
  type: GET_USERS_HOURS_TOKEN_REQUEST,
  payload: googleDriveAuth,
})

export const getUsersHoursTokenSuccess = () => ({
  type: GET_USERS_HOURS_TOKEN_SUCCESS,
})

export const getUsersHoursTokenError = () => ({
  type: GET_USERS_HOURS_TOKEN_ERROR,
})

export const googleAuthChangeGoogleSheetLink = (googleSheetInputValue) => ({
  type: GOOGLE_AUTH_CHANGE_GOOGLE_SHEET_LINK,
  payload: googleSheetInputValue,
})

export const googleAuthSendGoogleSheetSyncRequest = () => ({
  type: GOOGLE_AUTH_SEND_GOOGLE_SHEET_SYNC_REQUEST,
})

export const googleAuthSyncGoogleSheetSuccess = () => ({
  type: GOOGLE_AUTH_SYNC_GOOGLE_SHEET_SUCCESS,
})

export const googleAuthSyncGoogleSheetError = (users) => ({
  type: GOOGLE_AUTH_SYNC_GOOGLE_SHEET_ERROR,
  payload: users,
})

export const googleAuthErrorListToggle = () => ({
  type: GOOGLE_AUTH_IS_ERROR_MODAL_TOGGLE,
})
