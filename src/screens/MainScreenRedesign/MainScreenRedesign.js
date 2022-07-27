import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { getDeveloperProjects, getProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
import TimeReportScreen from '../TimeReportScreen'
// import ProjectsScreen from '../ProjectsScreen'
// import ProfileScreen from "../ProfileScreen";
import {
  getProfileEmail,
  getProfileId,
  getProfileName,
  getRoleUser,
  getUserAuthStatus,
} from 'selectors/user'
import { getCurrenciesList, getRatesList } from 'actions/currency'
import { getSelectedMonthSelector } from 'reducers/projects-report'
// import PmPrivateRoute from '../../Routes/PmPrivatRoute'
import SideMenu from 'components/side-menu'
import ProjectReportNew from 'components/project-report-new-design'
import './MainScreen.scss'
// import InHouseEmployees from 'components/in-house-employees'
// import RemoteContractors from 'components/remote-contractors/RemoteContractors'
// import PeopleScreen from "../PeopleScreen";
// import TotalOverview from 'components/total-overview/TotalOverview'
import ProjectManagementComponent from 'components/project-managment-new-design/ProjectManagementComponent'
import PmPrivateRoute from 'Routes/PmPrivatRoute'
import { VilmatesScreen } from '../VilmatesScreen'

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
  getSelectedMonth,
}) {
  const date = getSelectedMonth
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
          month: date.month + 1 || date.getMonth() + 1,
        }
        getCurrenciesList()
        getRatesList(ratesParams)
      } else {
        getDeveloperProjects()
      }
    }
  }, [
    date,
    getRatesList,
    getDeveloperProjects,
    isAuth,
    roleUser,
    profileEmail,
    selectDevelopers,
    profileId,
    getCurrenciesList,
    profileName,
  ])

  if (!isAuth) {
    return <Redirect to="/auth" />
  }

  return (
    <div className="new_design">
      <SideMenu />
      <Switch>
        <Route path="/projectreport" component={ProjectReportNew} exact />
        {/* <Route path="/inhouseemployees" component={InHouseEmployees} exct /> */}
        <Route path="/timereport" component={TimeReportScreen} exact />
        <Route path="/vilmates" component={VilmatesScreen} exact />
        {/* <Route path="/people" component={PeopleScreen}/>
        <Route path="/profile" component={ProfileScreen} exct /> */}
        {/* <Route path="/remotecontractors" component={RemoteContractors} exct /> */}
        <PmPrivateRoute
          path="/projectmanagement"
          component={ProjectManagementComponent}
          exact
        />
        {/* <Route path="/totaloverview" component={TotalOverview} exct /> */}
        <Redirect from="/" to="/timereport" />
      </Switch>
    </div>
  )
}

const actions = {
  getProjects,
  getDeveloperProjects,
  selectDevelopers,
  getCurrenciesList,
  getRatesList,
}

const mapStateToProps = (state) => ({
  isAuth: getUserAuthStatus(state),
  roleUser: getRoleUser(state),
  profileId: getProfileId(state),
  profileName: getProfileName(state),
  profileEmail: getProfileEmail(state),
  getSelectedMonth: getSelectedMonthSelector(state),
})

export default connect(mapStateToProps, actions)(memo(MainScreen))
