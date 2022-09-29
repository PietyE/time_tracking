import {
  SET_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
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
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
} from 'constants/actions-constant'

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

export const setSelectedProjectInProjectReports = (payload) => ({
  type: SET_SELECTED_PROJECT_PROJECTREPORTS,
  payload,
})

export const getDevelopersProjectInProjectReport = () => ({
  type: GET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
})

export const setDevelopersProjectInProjectReport = (payload) => ({
  type: SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
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

export const getUsersHoursAuthUrlRequest = () => ({
  type: GET_USERS_HOURS_AUTH_URL_REQUEST,
})

export const getUsersHoursAuthUrlSuccess = (googleSyncWithDriveUrl) => ({
  type: GET_USERS_HOURS_AUTH_URL_SUCCESS,
  payload: googleSyncWithDriveUrl,
})

export const changeSelectedDateProjectReports = (date) => ({
  type: CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  payload: date,
})
