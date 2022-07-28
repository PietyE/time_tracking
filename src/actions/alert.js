import {
  SHOW_ALERT,
  HIDE_ALERT,
  START_SHOW_ALERT,
  SET_MESSAGE,
} from 'constants/actions-constant'

/**
 * Action to manually create aler message
 * @param {obj} type - type for notification (success, system, warning)
 * {  type: WARNING_ALERT,
      message: "Something went wrong...",
      title: "",
      delay: 3000
  }
 * @returns {Action}
 */

export const showAlert = payload => ({
  type: SHOW_ALERT,
  payload,
})

export const setMessage = payload => ({
  type: SET_MESSAGE,
  payload,
})

export const startShowAlert = () => ({
  type: START_SHOW_ALERT,
})

export const hideAlert = () => ({
  type: HIDE_ALERT,
})
