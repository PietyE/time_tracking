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
 import { currencies } from 'reducers/currency'

const rootReducer = combineReducers({
  profile,
  alert,
  error,
  timereports,
  developerProjects,
  developers,
  projectsReport,
  currencies
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
