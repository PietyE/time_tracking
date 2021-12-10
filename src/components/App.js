import React from 'react'
import { connect, useSelector } from 'react-redux'

import AlertStyled from 'components/ui/alert'
import StatusPage from 'components/common/StatusPage'
import RootRouteComponent from 'screens/RootRouteComponent'
import { getAlertIsShownAlertSelector } from 'selectors/alert'
import { getErrorStatus } from 'selectors/error'



import '../styles/App.css'

const App = ({ isShownAlert, errorStatus }) => {

  const appClass = 'app';
  if (errorStatus === 500) {
    return <StatusPage />
  }


  return (
    <div className={appClass}>

    <RootRouteComponent />
      {isShownAlert && <AlertStyled />}
    </div>
  )
}

const mapStateToProps = state => ({
  isShownAlert: getAlertIsShownAlertSelector(state),
  errorStatus: getErrorStatus(state),
})

export default connect(mapStateToProps)(App)
