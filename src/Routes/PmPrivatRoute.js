import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoleUser, getUserPermissions } from 'selectors/user'
import { ADMIN, PM } from 'constants/role-constant'
import { userPermissions } from 'constants/permissions'

export default function PmPrivateRoute({ component: Component, ...rest }) {
  const role = useSelector(getRoleUser)
  const permissions = useSelector(getUserPermissions)
  return (
    <Route
      {...rest}
      render={(props) =>
        role === PM ||
        role === ADMIN ||
        permissions?.includes(userPermissions.projects_view_project) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
