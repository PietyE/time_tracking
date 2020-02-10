import { all } from 'redux-saga/effects'

import { watchGetUserAsync } from './users-saga'
import { watchshowAlert } from './alert-saga'
import { watchErrorAlert } from './error-saga'

export function* rootSaga() {
  yield all([watchGetUserAsync(), watchshowAlert(), watchErrorAlert()])
}
