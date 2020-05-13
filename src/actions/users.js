import {
  SET_USER_OAUTH_DATA,
  SHOW_ALERT,
  CLEAN_USER_OAUTH_DATA,
  LOG_IN,
  LOG_OUT,
  BOOTSTRAP,
  SET_AUTH_STATUS,
  SET_FETCHING_PROFILE_STATUS,
} from 'constants/actions-constant'

export const setUsersOauthData = (payload) => ({
  type: SET_USER_OAUTH_DATA,
  payload,
})

export const shownAlert = (payload) => ({
  type: SHOW_ALERT,
  payload,
})

export const cleanUserOauthData = () => ({
  type: CLEAN_USER_OAUTH_DATA,
})

export const bootstrap = () => ({
  type: BOOTSTRAP,
})

export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
})

export const logOut = () => ({
  type: LOG_OUT,
})

export const setAuthStatus = (payload) => ({
  type: SET_AUTH_STATUS,
  payload,
})

export const setFetchingProfileStatus = (payload) => ({
  type: SET_FETCHING_PROFILE_STATUS,
  payload,
})
