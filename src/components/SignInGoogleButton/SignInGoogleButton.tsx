import type { FC } from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';

import GoogleLogo from 'shared/UI/svg/GoogleLogo';
import { styles } from './styles';

// readonly render?: (props: { onClick: () => void, disabled?: boolean }) => JSX.Element;

interface ISignInGoogleButtonProps extends ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignInGoogleButton: FC<ISignInGoogleButtonProps> = (props) => {
  return (
    <Button
      startIcon={<GoogleLogo />}
      fullWidth
      sx={styles}
      {...props}
    >
      Login with Google
    </Button>
  );
};

export default SignInGoogleButton;
