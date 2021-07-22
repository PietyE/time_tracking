import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  GET_ALL_PROJECTS, GET_SELECTED_PROJECT, GET_USERS,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT, SET_USERS,
  SET_USERS_ON_PROJECT,GET_USER_INFO_BY_PROJECT,SET_PROJECTS_WITH_REPORT
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

export const getUsersInfoByProject =(payload)=>({
  type: GET_USER_INFO_BY_PROJECT,
  payload
})
export const setProjectsWithReport = (payload) => ({
  type: SET_PROJECTS_WITH_REPORT,
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

export const getUsers = (payload) => ({
  type: GET_USERS,
  payload,
})

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
})
