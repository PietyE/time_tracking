import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .max(50, 'Email must be less than 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .max(30, 'Password must be less than 30 symbols')
    .required('Password is required'),
});
