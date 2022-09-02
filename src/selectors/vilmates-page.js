export const getUsers = (state) => state.vilmatesPage.users

export const getLoading = (state) => state.vilmatesPage.isLoading

export const getSelectedUser = (state) =>
  state.vilmatesPage.singlePage.selectedUser

export const isSelectedUserLoading = (state) =>
  state.vilmatesPage.singlePage.isLoading

export const getSelectedUserDeveloperProjects = (state) =>
  state.vilmatesPage.singlePage.developerProjects

export const getComments = (state) =>
  state.vilmatesPage.singlePage.comments.data

export const getCommentsLoading = (state) =>
  state.vilmatesPage.singlePage.comments.isLoading
