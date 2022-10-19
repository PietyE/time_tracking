import { useSelector } from 'react-redux'
import { getRoleUser, getUserPermissions } from '../selectors/user'
import { Redirect, Route } from 'react-router-dom'
import { ACCOUNTANT, ADMIN } from 'constants/role-constant'
import React from 'react'
import { userPermissions } from 'constants/permissions'

export default function GoogleSyncPrivateRoot({
  component: Component,
  ...rest
}) {
  const role = useSelector(getRoleUser)
  const permissions = useSelector(getUserPermissions)
  return (
    <Route
      {...rest}
      render={(props) =>
        role === ACCOUNTANT ||
        role === ADMIN ||
        permissions?.includes(userPermissions.gsheets_add_accesscredentials) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
