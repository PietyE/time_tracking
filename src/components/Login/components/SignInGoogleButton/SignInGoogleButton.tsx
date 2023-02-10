import type { FC } from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import VilmateIcon from 'shared/components/svg/VilmateIcon';
import { styles } from './styles';

interface ISignInGoogleButtonProps extends ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SignInGoogleButton: FC<ISignInGoogleButtonProps> = (props) => {
  return (
    <Button
      startIcon={<VilmateIcon />}
      fullWidth
      sx={styles}
      {...props}
    >
      Sign in Vilmate account
    </Button>
  );
};

export default SignInGoogleButton;
