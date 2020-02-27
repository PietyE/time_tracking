import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { getProjects, getDeveloperProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
import TimeReportScreen from './TimeReportScreen'
import BlogScreen from './BlogScreen'
import ProjectsScreen from './ProjectsScreen'

import Header from 'components/header'
import {
  getUserAuthStatus,
  getRoleUser,
  getProfileId,
  getProfileName,
  getProfileEmail,
} from 'selectors/user'

function MainScreen({
  isAuth,
  roleUser,
  getProjects,
  getDeveloperProjects,
  selectDevelopers,
  profileName,
  profileId,
  getProfileEmail,
}) {
  useEffect(() => {
    if (isAuth) {
      if (roleUser === DEVELOPER) {
        getDeveloperProjects()
      } else {
        getProjects()
        selectDevelopers({
          id: profileId,
          name: profileName,
          email: getProfileEmail,
        })
      }
    }
  }, [])

  if (!isAuth) {
    return <Redirect to="/auth" />
  }

  return (
    <>
      <Header />
      <Route path="/projects" component={ProjectsScreen} exct />
      <Route path="/timereport" component={TimeReportScreen} exct />
      <Route path="/blog" component={BlogScreen} exct />
    </>
  )
}

const actions = {
  getProjects,
  getDeveloperProjects,
  selectDevelopers,
}

const mapStateToProps = state => ({
  isAuth: getUserAuthStatus(state),
  roleUser: getRoleUser(state),
  profileId: getProfileId(state),
  profileName: getProfileName(state),
  getProfileEmail: getProfileEmail(state),
})

export default connect(mapStateToProps, actions)(memo(MainScreen))
