import { createSelector } from 'reselect'

export const getUserAvatarUrlSelector = state => state.profile.imageUrl

export const getUserAuthStatusSelector = state => state.profile.isAuth

export const getRoleUser = state => state.profile.role

export const getFetchingProfileStatus = state => state.profile.isFetchingUsers

export const getProfileId = state => state.profile.id

export const getProfileName = state => state.profile.name

export const getProfileEmail = state => state.profile.email

export const getProfile = state =>state.profile;

export const getUserAvatarUrl = createSelector(
  getUserAvatarUrlSelector,
  imageUrl => imageUrl
)

export const getUserAuthStatus = createSelector(
  getUserAuthStatusSelector,
  isAuth => isAuth
)
