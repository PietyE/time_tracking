import { type FC } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import { styles } from './styles';

interface InputFields {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().min(1).max(50).required('Email is required'),
  password: Yup.string().min(1).max(30).required('Password is required'),
});

export const LoginSignInFormCredentials: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<InputFields> = (data) => console.log(data);

  return (
    <Stack
      width={1}
      component='form'
      sx={styles}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <TextField
          placeholder='Your email address'
          fullWidth
          {...register('email', { required: true })}
        />
        <ValidationErrorMessage>{errors.email?.message}</ValidationErrorMessage>
      </Box>
      <Box>
        <TextField
          placeholder='Your password'
          type='password'
          fullWidth
          {...register('password', { required: true })}
        />
        <ValidationErrorMessage>
          {errors.password?.message}
        </ValidationErrorMessage>
      </Box>
      <Button
        variant='contained'
        type='submit'
      >
        Sign In
      </Button>
    </Stack>
  );
};
