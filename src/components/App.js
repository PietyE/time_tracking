import React from 'react'
import { connect } from 'react-redux'

import AlertStyled from 'components/ui/alert'
import RootRouteComponent from 'screens/RootRouteComponent'
import { getAlertIsShownAlertSelector } from 'selectors/alert'

const App = ({ isShownAlert }) => {
  return (
    <>
      {isShownAlert && <AlertStyled />}
      <RootRouteComponent />
    </>
  )
}

const mapStateToProps = state => ({
  isShownAlert: getAlertIsShownAlertSelector(state),
})

export default connect(mapStateToProps)(App)
