import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  GET_ALL_PROJECTS, GET_SELECTED_PROJECT, GET_USERS,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT, SET_USERS,
  SET_USERS_ON_PROJECT,GET_PROJECT_REPORT_BY_ID,SET_PROJECT_REPORTS,GET_DOWNLOAD_PROJECT_REPORT
} from 'constants/actions-constant'

export const changeSelectedDateProjectsManagement = (payload) => ({
  type: CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  payload,
})

export const getAllProjects = (payload) => ({
  type: GET_ALL_PROJECTS,
  payload,
})

export const setAllProjects = (payload) => ({
  type: SET_ALL_PROJECTS,
  payload,
})

export const getProjectReportById =(payload)=>({
  type: GET_PROJECT_REPORT_BY_ID,
  payload
})
export const setProjectsWithReport = (payload) => ({
  type: SET_PROJECT_REPORTS,
  payload,
})

export const downloadProjectReport = payload =>({
  type: GET_DOWNLOAD_PROJECT_REPORT,
  payload,
})

export const getUsers = (payload) => ({
  type: GET_USERS,
  payload,
})

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
})


export const getSelectedProject = (payload) => ({
  type: GET_SELECTED_PROJECT,
  payload,
})

export const setSelectedProject = (payload) => ({
  type: SET_SELECTED_PROJECT,
  payload,
})

export const setUsersOnProject = (payload) => ({
  type: SET_USERS_ON_PROJECT,
  payload,
})


