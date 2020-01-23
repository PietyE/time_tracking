import React, { PureComponent } from "react";
import { connect } from "react-redux";

import AlertStyled from "components/ui/alert";
import RootRouteComponent from "screens/RootRouteComponent";

class App extends PureComponent {
  render() {
    const { isShownAlert } = this.props;
    return (
      <>
        {isShownAlert && <AlertStyled />}
        <RootRouteComponent />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isShownAlert: state.alert.isShownAlert
});

export default connect(mapStateToProps)(App);
