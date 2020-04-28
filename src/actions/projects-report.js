import {
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_DEV_CONSOLIDATE_PROJECT_REPORT,
  GET_DEV_CONSOLIDATE_PROJECT_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
} from 'constants/actions-constant'

export const changeSelectedDateProjectsReport = (payload) => ({
  type: CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  payload,
})

export const getDeveloperConsolidateProjectReport = (payload) => ({
  type: GET_DEV_CONSOLIDATE_PROJECT_REPORT,
  payload,
})

export const setDeveloperConsolidateProjectReport = (payload) => ({
  type: SET_DEV_CONSOLIDATE_PROJECT_REPORT,
  payload,
})

export const setSelectedDeveloper = (payload) => ({
  type: SET_SELECTED_DEVELOPER,
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
