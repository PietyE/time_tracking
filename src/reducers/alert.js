import {
  SHOW_ALERT,
  HIDE_ALERT,
  START_SHOW_ALERT
} from "constants/actions-constant";
import { WARNING_ALERT } from "constants/alert-constant";

const initial_state = {
  type: WARNING_ALERT,
  message: "Something went wrong...",
  title: "",
  delay: 3000,
  isShownAlert: false
};

export const alert = (state = initial_state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, ...action.payload };
    case START_SHOW_ALERT:
      return { ...state, isShownAlert: true };
    case HIDE_ALERT:
      return { ...initial_state };

    default:
      return state;
  }
};
