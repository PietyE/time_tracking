import React, { memo } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import TimeReportScreen from "./TimeReportScreen";

import Header from "components/header";
import BlogScreen from "./BlogScreen";

function MainScreen({ isOauth }) {
  if (!isOauth) {
    return <Redirect to="/auth" />;
  }
  return (
    <>
      <Header />
      <Route path="/timereport" component={TimeReportScreen} exct />
      <Route path="/blog" component={BlogScreen} exct />
    </>
  );
}

const mapStateToProps = state => ({
  isOauth: state.users.isOauth
});

export default connect(mapStateToProps)(memo(MainScreen));
