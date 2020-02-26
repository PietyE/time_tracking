import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

import { hideAlert } from 'actions/alert'
import {
  getAlertDelaySelector,
  getAlertIsShownAlertSelector,
  getAlertMessageSelector,
  getAlertTitleSelector,
  getAlertTypeSelector,
} from 'selectors/alert'

import './alert.css'

function AlertStyled({
  type,
  message,
  title,
  delay,
  hideAlert,
  isShownAlert,
  dismissible = true,
}) {
  const interval = setInterval(() => {
    if (isShownAlert) {
      document.getElementById('alert').classList.add('end_animation')
    }
    clearInterval(interval)
  }, delay - 400)

  useEffect(() => {
    return () => {
      clearInterval(interval)
    }
  }, [interval])

  const AlertComponent = () => (
    <Alert
      variant={type}
      dismissible={dismissible}
      className="alert_container"
      id="alert"
      onClose={hideAlert}
    >
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  )

  return ReactDOM.createPortal(
    <AlertComponent />,
    document.getElementById('alert')
  )
}

const mapStateToProps = state => ({
  type: getAlertTypeSelector(state),
  title: getAlertTitleSelector(state),
  message: getAlertMessageSelector(state),
  delay: getAlertDelaySelector(state),
  isShownAlert: getAlertIsShownAlertSelector(state),
})

const actions = { hideAlert }

export default connect(mapStateToProps, actions)(AlertStyled)
