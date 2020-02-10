import { SET_ERROR_DATA, CLEAN_ERROR_DATA } from 'constants/actions-constant'

export const setErrorData = payload => ({
  type: SET_ERROR_DATA,
  payload,
})

export const cleanErrorData = () => ({
  type: CLEAN_ERROR_DATA,
})
