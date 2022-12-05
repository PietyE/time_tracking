import type { FC } from 'react';
import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';

import SignInForm from './components/SignInForm';
import { getIsAuthProfileSelector } from 'redux/slices/profile';
import { useAppSelector } from 'hooks/redux';

import LogoSvg from 'shared/svg/Logo';
import { AppRoutes } from 'constants/appRoutesConstants';
import { styles } from './styles';

const LoginPage: FC = () => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);

  if (isAuth) {
    return (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    );
  }

  return (
    <Stack
      component='section'
      className='login-page'
      width='auto'
      height='100vh'
      alignItems='center'
      sx={styles.container}
    >
      <LogoSvg />
      <SignInForm />
    </Stack>
  );
};

export default LoginPage;
