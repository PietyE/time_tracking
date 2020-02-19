import { SET_SELECTED_DATE, SET_TIME_REPORTS } from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reports: [],
}
export const timereports = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload }
    case SET_TIME_REPORTS:
      return { ...state, reports: action.payload }
    default:
      return state
  }
}
