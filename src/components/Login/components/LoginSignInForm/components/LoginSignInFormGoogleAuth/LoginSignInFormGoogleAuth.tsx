import type { FC } from 'react';
import SignInGoogleButton from 'components/Login/components/SignInGoogleButton';
// import { useAppDispatch } from 'hooks/redux';

const LoginSignInFormGoogleAuth: FC = () => {
  // const dispatch = useAppDispatch();

  return <SignInGoogleButton onClick={() => console.log('click')} />;
};

export default LoginSignInFormGoogleAuth;
