import React, { memo, useState } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { logIn } from 'actions/users'
import { getUserAuthStatus } from 'selectors/user'
import { CLIENT_ID } from 'constants/auth-constant'
import googleIcon from 'images/google-icon.svg'
import SignInWithLogin from './SignInWithLogin'

import './styles.css'

function Auth(props) {
  const { logIn, isAuth } = props

  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState(false)

  const handleClickToggleModal = () => {
    setIsOpenModalSignIn((prev) => !prev)
  }

  const GoogleButton = (renderProps) => (
    <div className="button_container">
      <Button
        className="auth-google_button mb-3"
        variant="outline-primary"
        onClick={renderProps.onClick}
      >
        <img src={googleIcon} alt="google icon" className="auth-logo" />
        <span className="auth-text_button">Sign in with google</span>
      </Button>
      <Button className="auth-google_button" onClick={handleClickToggleModal}>
        <span className="auth-text_button">Sign in with login</span>
      </Button>
    </div>
  )

  if (isAuth) {
    return <Redirect to="/timereport" />
  }

  return (
    <>
      <div className="auth-container">
        <span className="logo_container"></span>
      </div>
      <GoogleLogin
        clientId={CLIENT_ID}
        render={GoogleButton}
        onSuccess={logIn}
        onFailure={logIn}
        cookiePolicy={'single_host_origin'}
      />
      <SignInWithLogin
        onClickClose={handleClickToggleModal}
        show={isOpenModalSignIn}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuth: getUserAuthStatus(state),
})

const actions = {
  logIn,
}

export default connect(mapStateToProps, actions)(memo(Auth))
