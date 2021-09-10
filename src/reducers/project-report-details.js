import {
  GET_USERS_PROJECT_REPORT,
  SET_ERROR_USER_PROJECT_REPORT,
  SET_SUCCESS_USERS_PROJECT_REPORT,
} from '../constants/actions-constant'

const initialState = {};


export const projectReportDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_PROJECT_REPORT:
      return {
        ...state,
        [action.payload]: {
          projects: [],
          isFetching: true,
          success: false,
          error: false,
        }
      }
    case SET_SUCCESS_USERS_PROJECT_REPORT:
      return {
        ...state,
        [action.payload.userId]: {
          projects: action.payload.mapperResponse,
          isFetching: false,
          success: true,
          error: false,
        }
      }
    case SET_ERROR_USER_PROJECT_REPORT:
      return {
        ...state,
        [action.payload]: {
          projects: [],
          isFetching: false,
          success: false,
          error: true,
        }
      }
    default:
      return state
  }
}