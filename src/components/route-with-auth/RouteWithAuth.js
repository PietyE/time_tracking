import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import Auth from "components/auth";

function RouteWithAuth(props) {
  const { isOauth, ..._props } = props;
  const location = useLocation();
  console.log("location", location);
  console.log("isOauth", isOauth);
  if (isOauth) {
    return <Route {..._props} />;
  } else {
    return (
      <Redirect
        to={{ pathname: "/auth", state: { path: location.pathname } }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isOauth: state.users.isOauth
});

export default connect(mapStateToProps)(RouteWithAuth);
