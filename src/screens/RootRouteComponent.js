import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { bootstrap } from 'actions/users'
import { getFetchingProfileStatus } from 'selectors/user'

import SpinnerStyled from 'components/ui/spinner'
import Modal from 'components/ui/modal'

const Auth = lazy(() => import('./AuthScreen'))
const MainScreen = lazy(() => import('./MainScreen'))

const RootRouteComponent = ({ bootstrap, isFetchingUsers }) => {
  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  if (isFetchingUsers) {
    return (
      <Modal>
        <SpinnerStyled />
      </Modal>
    )
  }

  return (
    <Router>
      <Suspense fallback={<SpinnerStyled />}>
        <Switch>
          <Route path="/auth" component={Auth} exact />
          <Route path="/" component={MainScreen} />
        </Switch>
      </Suspense>
    </Router>
  )
}

const actions = {
  bootstrap,
}

const mapStateToProps = state => ({
  isFetchingUsers: getFetchingProfileStatus(state),
})

export default connect(mapStateToProps, actions)(RootRouteComponent)
