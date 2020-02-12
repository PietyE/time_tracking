import React, { memo } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { logIn } from 'actions/users'
import { getUserAuthStatus } from 'selectors/user'
import Logo from 'components/ui/logo'
import { CLIENT_ID } from 'constants/auth-constant'
import googleIcon from 'images/google-icon.svg'

import './styles.css'

function Auth(props) {
  const { logIn, isAuth } = props

  const GoogleButton = renderProps => (
    <Button
      className="auth-google_button"
      variant="outline-primary"
      onClick={renderProps.onClick}
    >
      <img src={googleIcon} alt="google icon" className="auth-logo" />
      <span className="auth-text_button">Log in with google</span>
    </Button>
  )

  if (isAuth) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-container">
      <span className="logo_container">
        <Logo />
      </span>
      <div className="auth-google-btn-container">
        <GoogleLogin
          clientId={CLIENT_ID}
          render={GoogleButton}
          onSuccess={logIn}
          onFailure={logIn}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuth: getUserAuthStatus(state),
})

const actions = {
  logIn,
}

export default connect(mapStateToProps, actions)(memo(Auth))
