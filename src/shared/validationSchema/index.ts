import * as Yup from 'yup';
import { required, maxSymbols, minSymbols } from './utils';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .max(50, maxSymbols('Email', '50'))
    .required(required('Email')),
  password: Yup.string()
    .max(30, maxSymbols('Password', '30'))
    .required(required('Password')),
});

export const workItemValidationSchema = Yup.object().shape({
  reportText: Yup.string()
    .min(3, minSymbols('Report', '3'))
    .max(1000, maxSymbols('Report', '1000')),
  time: Yup.string().test('validTime', 'Invalid', (value) => {
    const [hour, min]: string[] = value?.split(':') ?? ['0:00'];
    const takeTime = hour ? +hour * 60 + +min : +min;
    return !(!value || value === '0:00' || takeTime > 480 || Number(min) > 59);
  }),
});
