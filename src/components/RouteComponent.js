import React, { PureComponent, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { bootstrap } from "actions/users";
import SpinnerStyled from "components/ui/spinner";

import "styles/App.css";

const Auth = lazy(() => import("./auth"));
const Main = lazy(() => import("./main/Main"));

// import Auth from "components/auth";
// import Main from "components/main/Main";

class RouteComponent extends PureComponent {
  constructor(props) {
    super(props);
    props.bootstrap();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Suspense fallback={<SpinnerStyled />}>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" component={Main} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

const actions = {
  bootstrap
};

export default connect(null, actions)(RouteComponent);
