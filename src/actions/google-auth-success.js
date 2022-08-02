import {
  GET_USERS_HOURS_TOKEN_ERROR,
  GET_USERS_HOURS_TOKEN_REQUEST,
  GET_USERS_HOURS_TOKEN_SUCCESS,
} from 'constants/google-auth-sucess-constants'

export const getUsersHoursTokenRequest = () => ({
  type: GET_USERS_HOURS_TOKEN_REQUEST,
})

export const getUsersHoursTokenSuccess = () => ({
  type: GET_USERS_HOURS_TOKEN_SUCCESS,
})

export const getUsersHoursTokenError = () => ({
  type: GET_USERS_HOURS_TOKEN_ERROR,
})
