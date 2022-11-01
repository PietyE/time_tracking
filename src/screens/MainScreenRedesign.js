import React, { memo, useEffect, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import { getDeveloperProjects, getProjects } from 'actions/developer-projects'
import { selectDevelopers } from 'actions/developers'
import { DEVELOPER } from 'constants/role-constant'
import {
  getProfileEmail,
  getProfileId,
  getProfileName,
  getRoleUser,
  getUserAuthStatus,
  getUserPermissions,
} from 'selectors/user'
import { getCurrenciesList, getRatesList } from 'actions/currency'
import { getSelectedMonthSelector } from 'reducers/projects-report'
import { userPermissions } from 'constants/permissions'
import SpinnerStyled from 'components/ui/spinner'
import Layout from 'components/ui/layout'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import PrivateRoute from 'Routes/PrivateRoot'

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
  const permissions = useShallowEqualSelector(getUserPermissions)
  useEffect(() => {
    if (isAuth) {
      if (
        roleUser !== DEVELOPER ||
        permissions?.includes(userPermissions.projects_view_developerproject)
      ) {
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

  const accessForProjectManagement =
    permissions?.includes(userPermissions.users_can_view_projectmanagement) ||
    roleUser === 4 ||
    roleUser === 3

  const accessForVilmates =
    permissions?.includes(userPermissions.users_can_view_vilmates) ||
    roleUser === 3

  const accessForSyncDrive =
    (permissions?.includes(userPermissions.users_can_view_syncdrive) &&
      permissions?.includes(userPermissions.gsheets_add_accesscredentials) &&
      permissions?.includes(userPermissions.users_add_user)) ||
    roleUser === 2 ||
    roleUser === 3

  return (
    <Layout>
      <Suspense fallback={<SpinnerStyled />}>
        <Switch>
          <Route path="/timereport" component={TimeReportScreen} exact />
          <Route path="/projectreport" component={ProjectReportNew} exact />
          <PrivateRoute
            path="/gsheets/auth-success"
            component={GoogleAuthSuccess}
            isHavePermission={accessForSyncDrive}
            exact
          />
          <PrivateRoute
            path="/projectmanagement"
            component={ProjectManagementComponent}
            isHavePermission={accessForProjectManagement}
            exact
          />
          <PrivateRoute
            path="/vilmates"
            component={VilmatesScreen}
            isHavePermission={accessForVilmates}
            exact
          />
          <PrivateRoute
            path="/vilmates/user/:userId"
            component={VilatesSinglePageScreen}
            isHavePermission={accessForVilmates}
            exact
          />
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
