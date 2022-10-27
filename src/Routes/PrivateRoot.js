import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isHavePermission, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isHavePermission ? <Component {...props} /> : <Redirect to="/" />
    }
  />
)

export default PrivateRoute
