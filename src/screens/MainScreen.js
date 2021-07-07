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
import { getCurrenciesList, getRatesList } from '../actions/currency'

function MainScreen({
  isAuth,
  roleUser,
  getDeveloperProjects,
  selectDevelopers,
  profileName,
  profileId,
  profileEmail,
  getCurrenciesList,
  getRatesList
}) {
  useEffect(() => {
    if (isAuth) {
      if (roleUser !== DEVELOPER) {
        selectDevelopers({
          id: profileId,
          name: profileName,
          email: profileEmail,
        })
        getCurrenciesList()
        getRatesList()

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
        <Redirect from="/" to="/timereport" />
      </Switch>
    </>
  )
}

const actions = {
  getProjects,
  getDeveloperProjects,
  selectDevelopers,
  getCurrenciesList,
  getRatesList
}

const mapStateToProps = (state) => ({
  isAuth: getUserAuthStatus(state),
  roleUser: getRoleUser(state),
  profileId: getProfileId(state),
  profileName: getProfileName(state),
  profileEmail: getProfileEmail(state),
})

export default connect(mapStateToProps, actions)(memo(MainScreen))
