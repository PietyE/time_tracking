export const getLoading = (state) => state.googleAuthSuccess.isLoading
export const getGoogleSheetSyncInputLink = (state) =>
  state.googleAuthSuccess.googleSheetLink
export const googleSheetSyncIsAgree = (state) => state.googleAuthSuccess.isAgree
