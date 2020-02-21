import {
  SET_IS_FETCHING_REPORTS,
  CHANGE_SELECTED_DATE,
  SET_TIME_REPORTS,
  DELETE_TIME_REPORT,
  ADD_TIME_REPORT,
  EDIT_TIME_REPORT,
} from 'constants/actions-constant'

export const changeSelectedDate = payload => ({
  type: CHANGE_SELECTED_DATE,
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
