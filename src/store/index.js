import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from 'sagas/rootSaga.js'
import { profile } from 'reducers/profile'
import { alert } from 'reducers/alert'
import { error } from 'reducers/error'
import { timereports } from 'reducers/timereport'
import { developerProjects } from 'reducers/developer-projects'
import { developers } from 'reducers/developers'
import { projectsReport } from 'reducers/projects-report'
import { pagination } from 'reducers/pagination'
import { currencies } from 'reducers/currency'
import { projectReportDetails } from 'reducers/project-report-details'
import { projectsManagement } from 'reducers/projects-management'
import { googleAuthSuccess } from 'reducers/google-auth-sucess'
import { vilmatesPage } from 'reducers/vilmates-page'
import { calendarReducer } from 'reducers/calendar'

const rootReducer = combineReducers({
  profile,
  alert,
  error,
  timereports,
  developerProjects,
  developers,
  projectsReport,
  pagination,
  projectsManagement,
  currencies,
  projectReportDetails,
  googleAuthSuccess,
  vilmatesPage,
  calendar: calendarReducer,
})

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export default store
