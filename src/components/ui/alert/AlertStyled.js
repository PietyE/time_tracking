import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

import { hideAlert } from "actions/alert";

import "./alert.css";

function AlertStyled({
  type,
  message,
  title,
  delay,
  hideAlert,
  isShownAlert,
  dismissible = true
}) {
  const interval = setInterval(() => {
    if (isShownAlert) {
      document.getElementById("alert").classList.add("end_animation");
    }
    clearInterval(interval);
  }, delay - 400);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  return (
    <Alert
      variant={type}
      dismissible={dismissible}
      className="container"
      id="alert"
      onClose={hideAlert}
    >
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}

const mapStateToProps = state => ({
  type: state.alert.type,
  message: state.alert.message,
  title: state.alert.title,
  delay: state.alert.delay,
  isShownAlert: state.alert.isShownAlert
});

const actions = { hideAlert };

export default connect(mapStateToProps, actions)(AlertStyled);
