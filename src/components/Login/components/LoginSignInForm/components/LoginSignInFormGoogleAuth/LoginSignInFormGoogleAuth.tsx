import type { FC } from 'react';
import { userGoogleSingInGetRedirectUrl } from 'redux/asyncActions/profile';
import SignInGoogleButton from 'components/Login/components/SignInGoogleButton';
import { useAppDispatch } from 'hooks/redux';

const LoginSignInFormGoogleAuth: FC = () => {
  const dispatch = useAppDispatch();

  const handleRedirectToGoogleAuth = (): void => {
    void dispatch(userGoogleSingInGetRedirectUrl());
  };

  return <SignInGoogleButton onClick={handleRedirectToGoogleAuth} />;
};

export default LoginSignInFormGoogleAuth;
