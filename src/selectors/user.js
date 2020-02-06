import { createSelector } from 'reselect'

export const getUserAvatarUrlSelector = state => state.profile.imageUrl

export const getUserAuthStatusSelector = state => state.profile.isAuth

export const getUserAvatarUrl = createSelector(
  getUserAvatarUrlSelector,
  imageUrl => imageUrl
)

export const getUserAuthStatus = createSelector(
  getUserAuthStatusSelector,
  isAuth => isAuth
)
