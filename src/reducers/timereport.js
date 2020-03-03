import {
  CHANGE_SELECTED_DATE_TIME_REPORT,
  SET_TIME_REPORTS,
  SELECT_PROJECT,
  SET_IS_FETCHING_REPORTS,
  SELECT_DEVELOPERS,
  CLEAR_SELECTED_PROJECT,
  RESET_SELECTED_DATE,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reports: [],
  selectedProject: {},
  selectedDeveloper: null,
  isFetchingReports: false,
}
export const timereports = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_TIME_REPORT:
      return { ...state, selectedDate: action.payload }
    case SET_TIME_REPORTS:
      return { ...state, reports: action.payload }
    case SELECT_PROJECT:
      return { ...state, selectedProject: action.payload }
    case CLEAR_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: initialState.selectedProject,
        reports: [],
      }
    case SELECT_DEVELOPERS:
      return { ...state, selectedDeveloper: action.payload }
    case SET_IS_FETCHING_REPORTS:
      return { ...state, isFetchingReports: action.payload }
    case RESET_SELECTED_DATE:
      return { ...state, selectedDate: initialState.selectedDate }
    default:
      return state
  }
}