import { all } from 'redux-saga/effects'

import { watchGetUserAsync } from './users-saga'
import { watchshowAlert } from './alert-saga'
import { watchErrorAlert } from './error-saga'
import { watchTimereports } from './timereports-saga'
import {
  watchDeveloperProjects,
  // watchReportsV2
} from './projectreport-saga'
// import { watchCurrencies } from './currency-saga'

import { watchProjectsManagement } from './projectsmanagement-saga'
import { watchGoogleAuthCreateToken } from './google-auth-success-saga'

export function* rootSaga() {
  yield all([
    watchGetUserAsync(),
    watchshowAlert(),
    watchErrorAlert(),
    watchTimereports(),
    watchDeveloperProjects(),
    // watchCurrencies(),
    watchProjectsManagement(),
    watchGoogleAuthCreateToken(),
    // watchReportsV2()
  ])
}
