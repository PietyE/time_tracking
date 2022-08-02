import {
  GET_USERS_HOURS_TOKEN_ERROR,
  GET_USERS_HOURS_TOKEN_REQUEST,
  GET_USERS_HOURS_TOKEN_SUCCESS,
} from 'constants/google-auth-sucess-constants'

const initialState = {
  isLoading: false,
  token: '',
}

export const googleAuthSuccess = (state, action) => {
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
        token: action.payload,
      }
    case GET_USERS_HOURS_TOKEN_ERROR:
      return {
        isLoading: false,
      }
    default:
      return state
  }
}
