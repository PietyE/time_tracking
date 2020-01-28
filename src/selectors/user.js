import { createSelector } from "reselect";

export const getUserAvatarUrlSelector = state =>
  state.users.googleOAuthData.imageUrl;

export const getUserAvatarUrl = createSelector(
  getUserAvatarUrlSelector,
  imageUrl => imageUrl
);
