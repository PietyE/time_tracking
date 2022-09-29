import {
  CHANGE_SELECTED_DATE,
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  CHANGE_SELECTED_DATE_TIME_REPORT,
} from '../constants/actions-constant'

const todayDate = new Date()

const initialState = {
  month: todayDate.getMonth(),
  year: todayDate.getFullYear(),
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        ...action.payload,
      }
    case CHANGE_SELECTED_DATE_TIME_REPORT:
      return {
        ...state,
        ...action.payload,
      }
    case CHANGE_SELECTED_DATE_PROJECTS_REPORT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
