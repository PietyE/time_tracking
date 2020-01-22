import {
  SET_USER_OAUTH_DATA,
  SHOW_ALERT,
  CLEAN_USER_OAUTH_DATA,
  LOG_IN,
  LOG_OUT,
  BOOTSTRAP
} from "constants/actions-constant";

export const setUsersOauthData = payload => ({
  type: SET_USER_OAUTH_DATA,
  payload
});

export const shownAlert = payload => ({
  type: SHOW_ALERT,
  payload
});

export const cleanUserOauthData = () => ({
  type: CLEAN_USER_OAUTH_DATA
});

export const bootstrap = () => ({
  type: BOOTSTRAP
});

export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT
});
