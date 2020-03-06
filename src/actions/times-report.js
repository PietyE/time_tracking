import {
  SET_IS_FETCHING_REPORTS,
  CHANGE_SELECTED_DATE_TIME_REPORT,
  SET_TIME_REPORTS,
  DELETE_TIME_REPORT,
  ADD_TIME_REPORT,
  EDIT_TIME_REPORT,
  RESET_SELECTED_DATE,
  SELECT_PROJECT,
  CLEAR_SELECTED_PROJECT,
  SET_EDIT_MODE,
} from 'constants/actions-constant'

export const changeSelectedDateTimeReport = payload => ({
  type: CHANGE_SELECTED_DATE_TIME_REPORT,
  payload,
})

export const setIsFetchingReports = payload => ({
  type: SET_IS_FETCHING_REPORTS,
  payload,
})

export const setTimeReports = payload => ({
  type: SET_TIME_REPORTS,
  payload,
})

export const addTimeReport = payload => ({
  type: ADD_TIME_REPORT,
  payload,
})

export const editTimeReport = payload => ({
  type: EDIT_TIME_REPORT,
  payload,
})

export const deleteTimeReport = payload => ({
  type: DELETE_TIME_REPORT,
  payload,
})

export const selectProject = payload => ({
  type: SELECT_PROJECT,
  payload,
})

export const clearSelectedProject = () => ({
  type: CLEAR_SELECTED_PROJECT,
})

export const resetSelectedDate = () => ({
  type: RESET_SELECTED_DATE,
})

export const setEditMode = payload => ({
  type: SET_EDIT_MODE,
  payload,
})
