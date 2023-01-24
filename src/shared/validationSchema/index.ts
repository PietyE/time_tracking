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

export const workItemValidationSchema = Yup.object().shape({
  reportText: Yup.string()
    .min(3, 'Report must be more than 3 symbols')
    .max(1000, 'Report must be less than 1000 symbols')
    .required('Report field is required'),
  time: Yup.string()
    .required()
    .test('validTime', 'Not valid', (value) => {
      const [hour, min]: string[] = value?.split(':') ?? ['0:00'];
      const takeTime = hour ? +hour * 60 + +min : +min;
      return !(!value || value === '0:00' || takeTime > 480);
    }),
});
