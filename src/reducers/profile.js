import {
  SET_USER_OAUTH_DATA,
  CLEAN_USER_OAUTH_DATA,
  SET_AUTH_STATUS,
  SET_FETCHING_PROFILE_STATUS, SET_AUTH_IN_PROGRESS, UNSET_AUTH_IN_PROGRESS,
} from 'constants/actions-constant'

const initial_state = {
  isAuth: true,
  isFetchingUsers: false,
  authInProgress: false
}

export const profile = (state = initial_state, action) => {
  switch (action.type) {
    case SET_USER_OAUTH_DATA:
      return { ...state, ...action.payload }
    case SET_AUTH_IN_PROGRESS:
      return { ...state, authInProgress: true }
    case UNSET_AUTH_IN_PROGRESS:
      return { ...state, authInProgress: false }
    case CLEAN_USER_OAUTH_DATA:
      return initial_state
    case SET_AUTH_STATUS:
      return { ...state, isAuth: action.payload }
    case SET_FETCHING_PROFILE_STATUS:
      return { ...state, isFetchingUsers: action.payload }
    default:
      return state
  }
}

export const getAuthInProgressSelector = (state) => state.profile.authInProgress;
export const getCurrentUserSelector = state => ({
  id: state.profile.id,
  name: state.profile.name,
  email: state.profile.email
})
