import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import { logIn, logInWithCredentials } from 'actions/users'
import { getUserAuthStatusSelector } from 'selectors/user'
import { CLIENT_ID } from 'constants/auth-constant'
import googleIcon from 'images/google-icon.svg'
import styles from './Auth.module.scss'
import logo from '../../images/logo-3.png';
import './styles.scss'
import useEqualSelector from '../../custom-hook/useEqualSelector'
import Separator from './Separator'
import { useFormik } from 'formik'
import { getAuthInProgressSelector } from '../../reducers/profile'
function Auth() {

  const isAuth = useEqualSelector(getUserAuthStatusSelector);
  const dispatch = useDispatch();

  const isAuthInProgress = useSelector(getAuthInProgressSelector);
  const onSubmit = (values, { setSubmitting }) => {
    if(isAuthInProgress) {
      return;
    }
    setSubmitting(true);
    dispatch(logInWithCredentials(values, setSubmitting));
  }
  const validate = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = 'You should enter your login'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (!values.password) {
      errors.password = 'You should enter password'
    }
    return errors
  }

  const GoogleButton = (renderProps) => (
      <Button
        className={styles.googleButton}
        variant="outline-primary"
        onClick={renderProps.onClick}
      >
        <img src={googleIcon} alt="google icon" className="auth-logo" />
        <span className={styles.buttonTitle}>Sign in with Google account</span>
      </Button>
  )

  const history = useHistory();

  if (isAuth) {
    history.push("/timereport")
    // return <Redirect to="/projectreport" />
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validate,
  })

  return (
    <div className={styles.authContainer}>
      <img
        alt=""
        src={logo}
        width={160}
        height={48}
        className={styles.imgContainer}
      />
      {/*  <span className="logo_container"></span>*/}
      <div className={styles.modalContainer}>
        <div className={styles.headerBlock}>
          <span className={styles.title}>Sign</span>
          <span className={styles.subtitle}>Sign in into Vilmate time reporter</span>
        </div>
        <div className={styles.buttonsBlock}>
          <GoogleLogin
            clientId={CLIENT_ID}
            render={GoogleButton}
            onSuccess={(v) => dispatch(logIn(v))}
            onFailure={(v) => dispatch(logIn(v))}
            cookiePolicy={'single_host_origin'}
          />

          <Separator width={415}/>

          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="fields email_field"
            >
              {/*<Form.Label>Email address</Form.Label>*/}
              <Form.Control
                className={styles.emailInput}
                type="email"
                placeholder="Your email address"
              />
              {errors.email && touched.email && (
                <Form.Text className="text-danger error_message">
                  {errors.email}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              controlId="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="fields password_field"
            >
              <Form.Control
                className={styles.emailInput}
                type="password"
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <Form.Text className="text-danger error_message">
                  {errors.password}
                </Form.Text>
              )}
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              disabled={!isValid}
              className={styles.submitButton}
            >
              <span className={styles.submitButtonTitle}>Sign In</span>
            </Button>
          </Form>

        </div>
      </div>
    </div>

  )
}

export default Auth;
