import type { FC } from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';

import GoogleLogo from 'shared/UI/svg/GoogleLogo';

// readonly render?: (props: { onClick: () => void, disabled?: boolean }) => JSX.Element;

interface ISignInGoogleButtonProps extends ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignInGoogleButton: FC<ISignInGoogleButtonProps> = (props) => {
  return (
    <Button
      className='google-button'
      startIcon={<GoogleLogo />}
      fullWidth
      {...props}
    >
      Login with Google
    </Button>
  );
};

export default SignInGoogleButton;
