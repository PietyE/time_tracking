import { all } from 'redux-saga/effects'

import { watchGetUserAsync } from './users-saga'
import { watchshowAlert } from './alert-saga'
import { watchErrorAlert } from './error-saga'
import { watchTimereports } from './timereports-saga'
import { watchDeveloperProjects } from './projectreport-saga'
import { watchCurrencies } from './currency-saga'
import { watchNewConsolidatedReport } from './project-report-saga'


export function* rootSaga() {
  yield all([
    watchGetUserAsync(),
    watchshowAlert(),
    watchErrorAlert(),
    watchTimereports(),
    watchDeveloperProjects(),
    watchCurrencies(),
    watchNewConsolidatedReport()
  ])
}
