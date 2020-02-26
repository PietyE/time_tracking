import { all } from 'redux-saga/effects'

import { watchGetUserAsync } from './users-saga'
import { watchshowAlert } from './alert-saga'
import { watchErrorAlert } from './error-saga'
import { watchTimereports } from './timereports-saga'
import { processingWatcher } from './location-processing-saga'

export function* rootSaga() {
  yield all([
    watchGetUserAsync(),
    watchshowAlert(),
    watchErrorAlert(),
    watchTimereports(),
    processingWatcher(),
  ])
}
