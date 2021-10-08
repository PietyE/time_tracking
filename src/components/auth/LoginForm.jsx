import React,{useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { logInWithCredentials } from '../../actions/users'
import { getAuthInProgressSelector } from '../../reducers/profile'

function LoginForm({cleanErros, serverErrpr}) {
    useEffect(()=>{
        cleanErros();
    }, [])
    const dispatch = useDispatch();
    const isAuthInProgress = useSelector(getAuthInProgressSelector);
    const onSubmit = (values, { setSubmitting }) => {
        if(isAuthInProgress) {
            return;
        }
        setSubmitting(true);

        dispatch(logInWithCredentials(values, setSubmitting));
        cleanErros();
    }
    const validate = (values) => {
        cleanErros();
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

    return <>
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
                <Form.Control className={errors.email || serverErrpr.status  ? 'error': ""} type="email" placeholder="Your email address" />
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
                {/*<Form.Label>Password</Form.Label>*/}
                <Form.Control className={errors.password || serverErrpr.status ? "error": ""} type="password" placeholder="Password" />
                {errors.password && touched.password && (
                    <Form.Text className="text-danger error_message">
                        {errors.password}
                    </Form.Text>
                )}
            </Form.Group>
            {serverErrpr.status&&
                        <div className="server-error">
                            {serverErrpr.message}
                        </div>
                }
            <Button
                //variant="success"
                type="submit"
                disabled={isSubmitting}
                className="sign-in w-100"
            >
                Sign In
            </Button>

        </Form>
    </>
}

export default LoginForm;