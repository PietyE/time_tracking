import { useSelector } from 'react-redux'
import { getRoleUser } from '../selectors/user'
import { Redirect, Route } from 'react-router-dom'
import { ACCOUNTANT, ADMIN } from 'constants/role-constant'
import React from 'react'

export default function GoogleSyncPrivateRoot({
  component: Component,
  ...rest
}) {
  const role = useSelector(getRoleUser)
  return (
    <Route
      {...rest}
      render={(props) =>
        role === ACCOUNTANT || role === ADMIN ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
