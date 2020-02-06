import React, { memo } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { logIn } from 'actions/users'
import { getUserAuthStatus } from 'selectors/user'
import Logo from 'components/ui/logo'
import { CLIENT_ID } from 'constants/auth-constant'
import styles from './styles.module.css'
import googleIcon from 'images/google-icon.svg'

function Auth(props) {
  const { logIn, isAuth } = props

  const GoogleButton = renderProps => (
    <Button
      className={styles.google_button}
      variant="outline-primary"
      onClick={renderProps.onClick}
    >
      <img src={googleIcon} alt="google icon" className={styles.logo} />
      <span className={styles.text_button}>Log in with google</span>
    </Button>
  )

  if (isAuth) {
    return <Redirect to="/" />
  }

  return (
    <div className={styles.container}>
      <span className={styles.logo_container}>
        <Logo />
      </span>
      <p className={styles.title}>Log in to your account</p>
      <div className={styles.button_wrap}>
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
