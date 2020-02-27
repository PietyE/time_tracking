import {
  SET_DEVELOPER_PROJECTS,
  GET_DEVELOPER_PROJECTS,
  SELECT_PROJECT,
  GET_PROJECTS,
  CLEAR_SELECTED_PROJECT,
} from 'constants/actions-constant'

export const getDeveloperProjects = payload => ({
  type: GET_DEVELOPER_PROJECTS,
  payload,
})

export const getProjects = payload => ({
  type: GET_PROJECTS,
  payload,
})

export const setDeveloperProjects = payload => ({
  type: SET_DEVELOPER_PROJECTS,
  payload,
})

export const selectProject = payload => ({
  type: SELECT_PROJECT,
  payload,
})

export const clearSelectedProject = () => ({
  type: CLEAR_SELECTED_PROJECT,
})
