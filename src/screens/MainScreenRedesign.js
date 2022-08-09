import React, { memo, useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { getDeveloperProjects, getProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
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
// import InHouseEmployees from 'components/in-house-employees'
// import RemoteContractors from 'components/remote-contractors/RemoteContractors'
// import PeopleScreen from "../PeopleScreen";
// import TotalOverview from 'components/total-overview/TotalOverview'
import PmPrivateRoute from 'Routes/PmPrivatRoute'
import SpinnerStyled from 'components/ui/spinner'
import GoogleSyncPrivateRoot from 'Routes/GoogleSyncPrivateRoot'
import Layout from 'components/ui/layout'

const TimeReportScreen = lazy(() => import('screens/TimeReportScreen'))

const ProjectReportNew = lazy(() =>
  import('components/project-report-new-design/ProjectReportNew')
)

const VilmatesScreen = lazy(() => import('screens/VilmatesScreen'))

const ProjectManagementComponent = lazy(() =>
  import('components/project-managment-new-design/ProjectManagementComponent')
)

const GoogleAuthSuccess = lazy(() => import('screens/GoogleAuthSuccessScreen'))

const VilatesSinglePageScreen = lazy(() =>
  import('screens/VilmateSinglePageScreen')
)

function MainScreenRedesign(props) {
  const {
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
  } = props

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
    <Layout>
      <Suspense fallback={<SpinnerStyled />}>
        <Switch>
          <Route path="/projectreport" component={ProjectReportNew} exact />
          {/* <Route path="/inhouseemployees" component={InHouseEmployees} exct /> */}
          <Route path="/timereport" component={TimeReportScreen} exact />
          <Route path="/vilmates" component={VilmatesScreen} exact />
          <GoogleSyncPrivateRoot
            path="/gsheets/auth-success"
            component={GoogleAuthSuccess}
            exact
          />
          <Route
            path="/vilmates/:userId"
            component={VilatesSinglePageScreen}
            exact
          />
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
      </Suspense>
    </Layout>
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

export default connect(mapStateToProps, actions)(memo(MainScreenRedesign))
