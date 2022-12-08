import { type FC } from 'react';
import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import SignInForm from './components/SignInForm';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppShallowSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'redux/slices/profile';
import LogoSvg from 'assets/svg/Logo';
import { styles } from './styles';

export const Login: FC = (): JSX.Element => {
  const isAuth = useAppShallowSelector(getIsAuthProfileSelector);

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
