import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {getRoleUser} from '../selectors/user'
import { ADMIN, DEVELOPER, PM } from 'constants/role-constant'



export default function PmPrivateRoute({component: Component, ...rest}) {
  const role = useSelector(getRoleUser)
  return (
    <Route {...rest} render = {(props) =>
      ( role === PM || role === ADMIN ? <Component {...props} /> : <Redirect to = '/'/>)
    }
    />
  )
}
;
