export const getLoading = (state) => state.googleAuthSuccess.isLoading
export const getGoogleSheetSyncInputLink = (state) =>
  state.googleAuthSuccess.googleSheetLink
export const googleSheetSyncIsAgree = (state) => state.googleAuthSuccess.isAgree
export const isOpenErrorList = (state) =>
  state.googleAuthSuccess.isOpenErrorList

export const getUsers = (state) => state.googleAuthSuccess.users
