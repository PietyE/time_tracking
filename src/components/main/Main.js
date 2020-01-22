import React, { memo } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import TimeReport from "components/time-report";

import { logOut } from "actions/users.js";
import Header from "components/header";

function Main({ isOauth }) {
  if (!isOauth) {
    return <Redirect to="/auth" />;
  }
  return (
    <>
      <Header />
      <Route path="/timereport" component={TimeReport} exact />
    </>
  );
}

const mapStateToProps = state => ({
  isOauth: state.users.isOauth
});

const actions = {
  logOut
};

export default connect(mapStateToProps, actions)(memo(Main));
