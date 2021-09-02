import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import { getProjects, getDeveloperProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
import TimeReportScreen from './TimeReportScreen'
import ProjectsScreen from './ProjectsScreen'

import Header from 'components/header'
import {
  getUserAuthStatus,
  getRoleUser,
  getProfileId,
  getProfileName,
  getProfileEmail,
} from 'selectors/user'
import ProjectManagementScreen from './ProjectManagementScreen'
import PmPrivateRoute from '../Routes/PmPrivatRoute'

function MainScreen({
  isAuth,
  roleUser,
  getDeveloperProjects,
  selectDevelopers,
  profileName,
  profileId,
  profileEmail,
}) {
  useEffect(() => {
    if (isAuth) {
      if (roleUser !== DEVELOPER) {
        selectDevelopers({
          id: profileId,
          name: profileName,
          email: profileEmail,
        })
      } else {
        getDeveloperProjects()
      }
    }
  }, [])

  if (!isAuth) {
    return <Redirect to="/auth" />
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/projects" component={ProjectsScreen} exct />
        <Route path="/timereport" component={TimeReportScreen} exct />
        <PmPrivateRoute path="/management" exct component={ProjectManagementScreen} />

        <Redirect from="/" to="/timereport" />
      </Switch>
    </>
  )
}

const actions = {
  getProjects,
  getDeveloperProjects,
  selectDevelopers,
}

const mapStateToProps = (state) => ({
  isAuth: getUserAuthStatus(state),
  roleUser: getRoleUser(state),
  profileId: getProfileId(state),
  profileName: getProfileName(state),
  profileEmail: getProfileEmail(state),
})

export default connect(mapStateToProps, actions)(memo(MainScreen))
