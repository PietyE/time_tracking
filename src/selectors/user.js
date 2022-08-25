import { createSelector } from 'reselect'

export const getUserAvatarUrlSelector = (state) => state.profile.imageUrl

export const getUserAuthStatusSelector = (state) => state.profile.isAuth

export const getRoleUser = (state) => state.profile.role

export const getFetchingProfileStatus = (state) => state.profile.isFetchingUsers

export const getProfileId = (state) => state.profile.id

export const getProfileName = (state) => state.profile.name

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

export const getUserRoleText = createSelector([getRoleUser], (roleNumber) => {
  switch (roleNumber) {
    case 1: {
      return 'Developer'
    }
    case 2: {
      return 'Accountant'
    }
    case 3: {
      return 'Admin'
    }
    case 4: {
      return 'Project manager'
    }
    case 5: {
      return 'HR'
    }
    default: {
      return 'NoRole'
    }
  }
})
