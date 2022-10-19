import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoleUser, getUserPermissions } from 'selectors/user'
import { DEVELOPER } from 'constants/role-constant'
import { userPermissions } from 'constants/permissions'

export default function VIlmatesPrivateRoute({
  component: Component,
  ...rest
}) {
  const role = useSelector(getRoleUser)
  const permissions = useSelector(getUserPermissions)
  return (
    <Route
      {...rest}
      render={(props) =>
        role !== DEVELOPER ||
        permissions.includes(userPermissions.users_view_user) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
