import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

import SignInForm from './components/SignInForm';
import { getIsAuthProfileSelector } from 'store/reducers/profile';
import { useAppSelector } from 'hooks/redux';

import LogoSvg from 'components/common/svg/Logo';
import { AppRoutes } from 'constants/appRoutesConstants';

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
    <div className='login-page'>
      <LogoSvg className='login-page__logo' />
      <SignInForm />
    </div>
  );
};

export default LoginPage;
