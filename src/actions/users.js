import {
  SET_USER_OAUTH_DATA,
  SHOW_ALERT,
  CLEAN_USER_OAUTH_DATA,
  LOG_IN,
  LOG_OUT,
  BOOTSTRAP,
  SET_AUTH_STATUS,
  SET_FETCHING_PROFILE_STATUS,
  SET_NEW_RATE,
  SET_NEW_SALARY,
  SET_NEW_COST,
  SET_NEW_COMMENT,
  SET_EDITED_COMMENT,
  SET_PROCESSED_STATUS,
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

export const setNewSalary = (payload) => ({
  type: SET_NEW_SALARY,
  payload,
})

export const setNewRate = (payload) => ({
  type: SET_NEW_RATE,
  payload,
})

export const setNewCost = (payload) => ({
  type: SET_NEW_COST,
  payload,
})

export const setNewComment = (payload) => ({
  type: SET_NEW_COMMENT,
  payload,
})

export const setEditedComment = (payload) => ({
  type: SET_EDITED_COMMENT,
  payload,
})

export const setProcessedStatus = (payload) => ({
  type: SET_PROCESSED_STATUS,
  payload,
})
