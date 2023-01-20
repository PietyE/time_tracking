import { type FC } from 'react';
import { Stack } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { LoginSignInForm } from './components/LoginSignInForm';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'redux/selectors/profile';
import LogoSvg from 'shared/components/svg/Logo';
import { styles } from './styles';

export const Login: FC = (): JSX.Element => {
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
      width='auto'
      height='100vh'
      alignItems='center'
      sx={styles.container}
    >
      <LogoSvg />
      <LoginSignInForm />
    </Stack>
  );
};
