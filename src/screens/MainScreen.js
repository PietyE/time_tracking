import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import TimeReportScreen from './TimeReportScreen'
import BlogScreen from './BlogScreen'
import ProjectsScreen from './ProjectsScreen'

import Header from 'components/header'
import { getUserAuthStatus } from 'selectors/user'

function MainScreen({ isAuth }) {
  if (!isAuth) {
    return <Redirect to="/auth" />
  }
  return (
    <>
      <Header />
      <Route path="/projects" component={ProjectsScreen} exct />
      <Route path="/timereport" component={TimeReportScreen} exct />
      <Route path="/blog" component={BlogScreen} exct />
    </>
  )
}

const mapStateToProps = state => ({
  isAuth: getUserAuthStatus(state),
})

export default connect(mapStateToProps)(memo(MainScreen))
