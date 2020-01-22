import { all } from "redux-saga/effects";

import { watchGetUserAsync } from "./users-saga";
import { watchshowAlert } from "./alert-saga";

export function* rootSaga() {
  yield all([watchGetUserAsync(), watchshowAlert()]);
}
