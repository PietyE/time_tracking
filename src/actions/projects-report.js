import {
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  // SET_DEV_CONSOLIDATE_PROJECT_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_EDIT_USER_ID,
  SET_EXCHANGE_RATES,
  SET_IS_FETCHING_PROJECT_REPORTS,
  GET_CONSOLIDATE_PROJECT_REPORT,
  SET_CONSOLIDATE_PROJECT_REPORT,
  GET_USERS_PROJECT_REPORT,
  SET_ERROR_USER_PROJECT_REPORT,
  SET_SUCCESS_USERS_PROJECT_REPORT,
  SET_ALL_DEVELOPER_PROJECTS,
  GET_ALL_DEVELOPER_PROJECTS,
  GET_USERS_HOURS_AUTH_URL_REQUEST,
  GET_USERS_HOURS_AUTH_URL_SUCCESS,
  // SAVE_COMMENTS_HISTORY
} from 'constants/actions-constant'

export const changeSelectedDateProjectsReport = (payload) => ({
  type: CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  payload,
})

// export const getDeveloperConsolidateProjectReport = (payload) => ({
//   type: GET_DEV_CONSOLIDATE_PROJECT_REPORT,
//   payload,
// })

// export const setDeveloperConsolidateProjectReport = (payload) => ({
//   type: SET_DEV_CONSOLIDATE_PROJECT_REPORT,
//   payload,
// })

export const setSelectedDeveloper = (payload) => ({
  type: SET_SELECTED_DEVELOPER,
  payload,
})

export const setAllDevelopersProjectsPR = (payload) => ({
  type: SET_ALL_DEVELOPER_PROJECTS,
  payload,
})

export const getAllDevelopersProjectsPR = (payload) => ({
  type: GET_ALL_DEVELOPER_PROJECTS,
  payload,
})

export const clearDeveloperSelected = () => ({
  type: CLEAR_SELECTED_DEVELOPER,
})

export const setSelectedProjectInProjectReports = (payload) => ({
  type: SET_SELECTED_PROJECT_PROJECTREPORTS,
  payload,
})

export const clearSelectedProjectInProjectReports = () => ({
  type: CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
})

export const getDevelopersProjectInProjectReport = () => ({
  type: GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
})

export const setDevelopersProjectInProjectReport = (payload) => ({
  type: SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  payload,
})

export const setEditUserId = (payload) => ({
  type: SET_EDIT_USER_ID,
  payload,
})

export const setExchangeRates = (payload, callback) => ({
  type: SET_EXCHANGE_RATES,
  payload,
  callback,
})

export const setIsFetchingReports = (payload) => ({
  type: SET_IS_FETCHING_PROJECT_REPORTS,
  payload,
})

export const getConsolidateProjectReport = (payload) => ({
  type: GET_CONSOLIDATE_PROJECT_REPORT,
  payload,
})

export const setConsolidateProjectReport = (payload) => ({
  type: SET_CONSOLIDATE_PROJECT_REPORT,
  payload,
})

export const getUsersProjectReport = (payload) => ({
  type: GET_USERS_PROJECT_REPORT,
  payload,
})

export const setUsersProjectReport = (payload) => ({
  type: SET_SUCCESS_USERS_PROJECT_REPORT,
  payload,
})

export const setErrorUsersProjectReport = (payload) => ({
  type: SET_ERROR_USER_PROJECT_REPORT,
  payload,
})

// export const setReportHistory = (data) => ({
//   type: SAVE_COMMENTS_HISTORY,
//   payload: {data},
// })

//only for accountant

export const getUsersHoursAuthUrlRequest = () => ({
  type: GET_USERS_HOURS_AUTH_URL_REQUEST,
})

export const getUsersHoursAuthUrlSuccess = (googleSyncWithDrive) => ({
  type: GET_USERS_HOURS_AUTH_URL_SUCCESS,
  payload: googleSyncWithDrive,
})
