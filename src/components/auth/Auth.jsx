import React, {memo} from 'react'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login'
import {Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'

import {cleanUserErrorData, logIn} from 'actions/users'
import {getUserAuthStatus} from 'selectors/user'
import {CLIENT_ID} from 'constants/auth-constant'
import googleIcon from 'images/google-icon.svg'


import './styles.css'
import LoginForm from "./LoginForm";


function Auth(props) {
    const {logIn, cleanUserErrorData, isAuth, errors} = props

    const GoogleButton = (renderProps) => (
        <div className="login_container">
            <Button
                className="auth-google_button w-100"
                variant="outline-primary"
                onClick={renderProps.onClick}
            >
                <img src={googleIcon} alt="google icon" className="auth-logo"/>
                <span className="auth-text_button">Sign in with Google account</span>
            </Button>
        </div>
    )

    if (isAuth) {
        return <Redirect to="/timereport"/>
    }

    return (
        <>
            <div className="auth-container">
                <div className="logo-container">
                    <img className="logo" src={'./img/logo.svg'}/>
                    <img className="name" src={'./img/vilmate.svg'}/>
                </div>

                <div className="auth-wrapper">
                    <h1>Sign in</h1>
                    <p>Sign in into Vilmate time reporter</p>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={GoogleButton}
                        onSuccess={logIn}
                        onFailure={logIn}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div className="or-cont">
                        <div className="line"></div>
                        <div>or</div>
                        <div className="line"></div>
                    </div>

                    <LoginForm
                        cleanErros = {cleanUserErrorData}
                        serverErrpr={errors }
                    />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuth: getUserAuthStatus(state),
    errors: state.profile.error
})

const actions = {
    logIn,
    cleanUserErrorData
}

export default connect(mapStateToProps, actions)(memo(Auth))
