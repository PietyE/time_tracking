import {
  SET_USER_OAUTH_DATA,
  CLEAN_USER_OAUTH_DATA,
  SET_AUTH_STATUS,
} from 'constants/actions-constant'

const initial_state = {
  isAuth: true,
  isFetchingUsers: false,
}

export const profile = (state = initial_state, action) => {
  switch (action.type) {
    case SET_USER_OAUTH_DATA:
      return { ...state, ...action.payload }
    case CLEAN_USER_OAUTH_DATA:
      return initial_state
    case SET_AUTH_STATUS:
      return { ...state, isAuth: action.payload }
    default:
      return state
  }
}
