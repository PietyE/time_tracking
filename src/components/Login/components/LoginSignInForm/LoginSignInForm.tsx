import type { FC } from 'react';
import { Stack } from '@mui/material';

import { LoginSignInFormHeader } from './components/LoginSignInFormHeader';
import LoginSignInFormGoogleAuth from 'components/Login/components/LoginSignInForm/components/LoginSignInFormGoogleAuth';
import { styles } from './styles';

export const LoginSignInForm: FC = () => {
  return (
    <Stack
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width={1}
      maxWidth={535}
      border={1}
      borderColor='customGrey.STROKE_FORM_OPACITY_20'
      borderRadius={2.5}
      sx={styles}
    >
      <LoginSignInFormHeader />
      <LoginSignInFormGoogleAuth />
    </Stack>
  );
};
