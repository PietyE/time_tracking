import { put, delay, takeEvery, select } from "redux-saga/effects";

import { startShowAlert, hideAlert } from "actions/alert";
import { SHOW_ALERT } from "constants/actions-constant";

export function* showAlert() {
  const delayMS = yield select(state => state.alert.delay);
  yield put(startShowAlert());
  yield delay(delayMS);
  yield put(hideAlert());
}

export function* watchshowAlert() {
  yield takeEvery(SHOW_ALERT, showAlert);
}
