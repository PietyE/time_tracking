import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import { useFormik } from 'formik'

function SignInWithLogin(props) {
  // eslint-disable-next-line react/prop-types
  const { onClickClose, show } = props

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)
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

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
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
    <Modal
      show={show}
      onHide={onClickClose}
      backdrop={false}
      dialogClassName="modal_dialog_container"
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="fields email_field"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            {errors.password && touched.password && (
              <Form.Text className="text-danger error_message">
                {errors.password}
              </Form.Text>
            )}
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={isSubmitting}
            className="mr-3"
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={onClickClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignInWithLogin
