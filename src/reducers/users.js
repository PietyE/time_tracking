import {
  SET_USER_OAUTH_DATA,
  CLEAN_USER_OAUTH_DATA
} from "constants/actions-constant";

const initial_state = {
  googleOAuthData: {},
  isOauth: false,
  isFetchingUsers: false
};

export const users = (state = initial_state, action) => {
  switch (action.type) {
    case SET_USER_OAUTH_DATA:
      return { ...state, googleOAuthData: action.payload, isOauth: true };
    case CLEAN_USER_OAUTH_DATA:
      return { ...state, googleOAuthData: {}, isOauth: false };
    default:
      return state;
  }
};
