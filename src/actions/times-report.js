import {
  ADD_TIME_REPORT,
  CLEAR_SELECTED_PROJECT,
  DELETE_TIME_REPORT,
  EDIT_TIME_REPORT,
  GET_TIME_REPORT_CSV,
  RESET_SELECTED_DATE,
  SELECT_PROJECT,
  SET_DEVELOPER_PROJECTS_TR,
  SET_EDIT_MODE,
  SET_IS_FETCHING_REPORTS,
  SET_STATUS_USER,
  SET_TIME_REPORTS,
} from 'constants/actions-constant'

export const setIsFetchingReports = (payload) => ({
  type: SET_IS_FETCHING_REPORTS,
  payload,
})

export const setTimeReports = (payload) => ({
  type: SET_TIME_REPORTS,
  payload,
})

export const setDeveloperProjectsTR = (payload) => ({
  type: SET_DEVELOPER_PROJECTS_TR,
  payload,
})

export const addTimeReport = (payload) => ({
  type: ADD_TIME_REPORT,
  payload,
})

export const editTimeReport = (payload) => ({
  type: EDIT_TIME_REPORT,
  payload,
})

export const deleteTimeReport = (payload) => ({
  type: DELETE_TIME_REPORT,
  payload,
})

export const selectProject = (payload) => ({
  type: SELECT_PROJECT,
  payload,
})

export const clearSelectedProject = () => ({
  type: CLEAR_SELECTED_PROJECT,
})

export const resetSelectedDate = () => ({
  type: RESET_SELECTED_DATE,
})

export const setEditMode = (payload) => ({
  type: SET_EDIT_MODE,
  payload,
})

export const getTimeReportCsv = () => ({
  type: GET_TIME_REPORT_CSV,
})

export const setUserStatus = (payload) => ({
  type: SET_STATUS_USER,
  payload,
})
