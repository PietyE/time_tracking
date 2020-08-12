import { SET_DEVELOPERS } from 'constants/actions-constant'

const initialState = {
  developersList: [],
}

export const developers = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVELOPERS:
      return { ...state, developersList: action.payload }

    default:
      return state
  }
}
