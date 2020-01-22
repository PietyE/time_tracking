import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { bootstrap } from "actions/users";

class Bootstrap extends Component {
  constructor(props) {
    super(props);
    props.bootstrap();
  }
  shouldComponentUpdate(nextProps) {
    const { isOauth } = this.props;
    if (isOauth !== nextProps.isOauth) return true;
    return false;
  }
  render() {
    const { isOauth } = this.props;
    if (isOauth) {
      return null;
      //return <Redirect to="/" />;
    } else {
      return <Redirect to="/auth" />;
    }
  }
}

const mapStateToProps = state => ({
  isOauth: state.users.isOauth
});

const actions = {
  bootstrap
};

export default connect(mapStateToProps, actions)(Bootstrap);
