import {
  SET_DEVELOPERS,
  GET_DEVELOPERS,
  SELECT_DEVELOPERS,
} from 'constants/actions-constant'

export const getDevelopers = (payload) => ({
  type: GET_DEVELOPERS,
  payload,
})

export const setDevelopers = (payload) => ({
  type: SET_DEVELOPERS,
  payload,
})

export const selectDevelopers = (payload, projectIdForSelect) => ({
  type: SELECT_DEVELOPERS,
  payload,
  projectIdForSelect,
})
