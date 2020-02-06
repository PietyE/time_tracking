import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { bootstrap } from 'actions/users'
import SpinnerStyled from 'components/ui/spinner'

import 'styles/App.css'

const Auth = lazy(() => import('./AuthScreen'))
const MainScreen = lazy(() => import('./MainScreen'))

const RootRouteComponent = ({ bootstrap }) => {
  bootstrap()

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<SpinnerStyled />}>
          <Switch>
            <Route path="/auth" component={Auth} exact />
            <Route path="/" component={MainScreen} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

const actions = {
  bootstrap,
}

export default connect(null, actions)(RootRouteComponent)
