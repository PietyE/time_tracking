import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from 'sagas/rootSaga.js'
import { profile } from 'reducers/users'
import { alert } from 'reducers/alert'
import { error } from 'reducers/error'
import { timereports } from 'reducers/timereport'
import { developerProjects } from 'reducers/developer-projects'

const rootReducer = combineReducers({
  profile,
  alert,
  error,
  timereports,
  developerProjects,
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
