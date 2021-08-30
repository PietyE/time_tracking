import { GET_USERS_PROJECT_REPORT, SET_SUCCESS_USERS_PROJECT_REPORT } from '../constants/actions-constant'

const initialState = {
  usersProjectReports: {},
  isFetchingUsersProjectReports: false,
  successFetchUsersProjectReports: false,
  errorFetchUsersProjectReports: false,
}

export const projectReportDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_PROJECT_REPORT:
      return {
        ...state,
        isFetchingUsersProjectReports: true,
        successFetchUsersProjectReports: false,
        errorFetchUsersProjectReports: false
      }
    case SET_SUCCESS_USERS_PROJECT_REPORT:
      return {
        ...state,
        isFetchingUsersProjectReports: false,
        successFetchUsersProjectReports: true,
        usersProjectReports: action.payload
      }

    default:
      return state
  }
}