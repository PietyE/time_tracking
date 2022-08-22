import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getRoleUser } from 'selectors/user'
import { DEVELOPER } from 'constants/role-constant'

export default function VIlmatesPrivateRoute({
  component: Component,
  ...rest
}) {
  const role = useSelector(getRoleUser)
  return (
    <Route
      {...rest}
      render={(props) =>
        role !== DEVELOPER ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}
