import { createSelector } from 'reselect'

export const getUserAvatarUrlSelector = (state) => state.profile.imageUrl

export const getUserAuthStatusSelector = (state) => state.profile.isAuth

export const getFetchingProfileStatus = (state) => state.profile.isFetchingUsers

export const getProfileId = (state) => state.profile.id

export const getProfileName = (state) => state.profile.name

export const getProfilePosition = (state) => state.profile.position

export const getProfileEmail = (state) => state.profile.email

export const getProfileShowSideMenu = (state) => state.profile.sideMenuStatus

export const getProfileShowSideMenuArrow = (state) =>
  state.profile.sideMenuArrow

export const getProfile = (state) => state.profile

export const getUserAvatarUrl = createSelector(
  getUserAvatarUrlSelector,
  (imageUrl) => imageUrl
)

export const getUserAuthStatus = createSelector(
  getUserAuthStatusSelector,
  (isAuth) => isAuth
)

export const getUserPermissions = (state) => state.profile?.permissions
