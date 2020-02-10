import { SET_ERROR_DATA, CLEAN_ERROR_DATA } from 'constants/actions-constant'

const initialState = {
  status: null,
  messages: '',
  detail: '',
}

export const error = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_DATA:
      return { ...action.payload }
    case CLEAN_ERROR_DATA:
      return initialState
    default:
      return state
  }
}
