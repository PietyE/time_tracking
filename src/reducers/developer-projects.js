import { SET_DEVELOPER_PROJECTS } from 'constants/actions-constant'

const initialState = []

export const developerProjects = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVELOPER_PROJECTS:
      return action.payload

    default:
      return state
  }
}
