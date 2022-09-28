import { CHANGE_SELECTED_DATE } from '../constants/actions-constant'

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
    default:
      return state
  }
}
