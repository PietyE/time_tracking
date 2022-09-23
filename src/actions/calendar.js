import { CHANGE_SELECTED_DATE } from '../constants/actions-constant'

export const changeSelectedDate = (date) => ({
  type: CHANGE_SELECTED_DATE,
  payload: date,
})
