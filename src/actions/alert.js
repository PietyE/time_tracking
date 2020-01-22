import {
  SHOW_ALERT,
  HIDE_ALERT,
  START_SHOW_ALERT
} from "constants/actions-constant";

export const showAler = payload => ({
  type: SHOW_ALERT,
  payload
});

export const startShowAlert = () => ({
  type: START_SHOW_ALERT
});

export const hideAlert = () => ({
  type: HIDE_ALERT
});
