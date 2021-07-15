import React from 'react'
import { connect, useSelector } from 'react-redux'

import AlertStyled from 'components/ui/alert'
import StatusPage from 'components/common/StatusPage'
import RootRouteComponent from 'screens/RootRouteComponent'
import { getAlertIsShownAlertSelector } from 'selectors/alert'
import { getErrorStatus } from 'selectors/error'

import {getIsFetchingProjectsReport} from '../selectors/developer-projects'
import {getIsFetchingReport} from '../selectors/timereports'
import {isEqual} from 'lodash'

import '../styles/App.css'

const App = ({ isShownAlert, errorStatus }) => {
  const timeReportIsFetching = useSelector(getIsFetchingReport,isEqual)
  const projectsReportFetching = useSelector(getIsFetchingProjectsReport, isEqual)

  const appClass = timeReportIsFetching||projectsReportFetching?'app_without_scroll':'app';
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
