import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField } from '@mui/material';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { loginValidationSchema } from 'shared/validationSchema';
import { ValidationErrorMessage } from 'shared/components/ValidationErrorMessage';
import type { LoginSingInFormCredentialsFields } from './types';
import { styles } from './styles';

export const LoginSignInFormCredentials: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSingInFormCredentialsFields>({
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginSingInFormCredentialsFields> = (data) =>
    console.log(data);

  return (
    <Stack
      width={1}
      component='form'
      sx={styles}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box position='relative'>
        <TextField
          placeholder='Your email address'
          fullWidth
          {...register('email')}
        />
        <ValidationErrorMessage>{errors.email?.message}</ValidationErrorMessage>
      </Box>
      <Box position='relative'>
        <TextField
          placeholder='Your password'
          type='password'
          fullWidth
          {...register('password')}
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
