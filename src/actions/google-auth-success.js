import {
  GET_USERS_HOURS_TOKEN_ERROR,
  GET_USERS_HOURS_TOKEN_REQUEST,
  GET_USERS_HOURS_TOKEN_SUCCESS,
} from 'constants/google-auth-sucess-constants'

export const getUsersHoursTokenRequest = (googleDriveAuth) => ({
  type: GET_USERS_HOURS_TOKEN_REQUEST,
  payload: googleDriveAuth,
})

export const getUsersHoursTokenSuccess = (token) => ({
  type: GET_USERS_HOURS_TOKEN_SUCCESS,
  payload: token,
})

export const getUsersHoursTokenError = () => ({
  type: GET_USERS_HOURS_TOKEN_ERROR,
})
