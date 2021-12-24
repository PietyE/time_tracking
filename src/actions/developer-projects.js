import {
  SET_DEVELOPER_PROJECTS,
  GET_DEVELOPER_PROJECTS,
  GET_PROJECTS,
} from 'constants/actions-constant'

export const getDeveloperProjects = (payload) => ({
  type: GET_DEVELOPER_PROJECTS,
  payload,
})

export const getProjects = (payload) => ({
  type: GET_PROJECTS,
  payload,
})

export const setDeveloperProjects = (payload) => ({
  type: SET_DEVELOPER_PROJECTS,
  payload,
})
