import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import { getProjects, getDeveloperProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
import TimeReportScreen from '../TimeReportScreen'
import ProjectsScreen from '../ProjectsScreen'
import ProfileScreen from "../ProfileScreen";

import Header from 'components/header'
import {
  getUserAuthStatus,
  getRoleUser,
  getProfileId,
  getProfileName,
  getProfileEmail,
} from 'selectors/user'
import { getCurrenciesList, getRatesList } from '../../actions/currency'
import { getSelectedMonthSelector } from '../../reducers/projects-report'
import ProjectManagementScreen from '../ProjectManagementScreen'
import PmPrivateRoute from '../../Routes/PmPrivatRoute'
import SideMenu from 'components/side-menu'
import ProjectReportNew from 'components/project-report-new-design'
import './MainScreen.css'
import PeopleScreen from "../PeopleScreen";


function MainScreen({
  isAuth,
  roleUser,
  getDeveloperProjects,
  selectDevelopers,
  profileName,
  profileId,
  profileEmail,
  getCurrenciesList,
  getRatesList,
  getSelectedMonth
}) {
  const date = getSelectedMonth;
  useEffect(() => {
    if (isAuth) {
      if (roleUser !== DEVELOPER) {
        selectDevelopers({
          id: profileId,
          name: profileName,
          email: profileEmail,
        })
        const ratesParams = {
          is_active: true,
          year: date.year || date.getFullYear(),
          month: date.month + 1 || date.getMonth() + 1
        };
        getCurrenciesList()
        getRatesList(ratesParams)

      } else {
        getDeveloperProjects()

      }
    }
  }, [])

  if (!isAuth) {
    return <Redirect to="/auth" />
  }

  return (
    <div className="new_design">
      <SideMenu />
      {/* <Header /> */}
      <Switch>
        {/* <Route path="/old" component={Header} exct /> */}
        {/* <Route path="/old/project" component={ProjectsScreen} exct /> */}
        <Route path="/projectreport" component={ProjectReportNew} exct />
        <Route path="/timereport" component={TimeReportScreen} exct />
        <Route path="/people" component={PeopleScreen}/>
        <Route path="/profile" component={ProfileScreen} exct />
        <Route path="/projectmanagement" component={ProjectManagementScreen} exct />
        {/* <PmPrivateRoute path="/old/management" exct component={ProjectManagementScreen} /> */}

        {/* <Redirect from="/" to="/projectreport" /> */}
      </Switch>
    </div>
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
  getSelectedMonth: getSelectedMonthSelector(state)
})

export default connect(mapStateToProps, actions)(memo(MainScreen))