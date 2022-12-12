import type { FC } from 'react';
import { Stack } from '@mui/material';

import LoginSignInFormGoogleAuth from 'components/Login/components/LoginSignInForm/components/LoginSignInFormGoogleAuth';
import { styles } from './styles';

export const LoginSignInForm: FC = () => {
  return (
    <Stack
      flexDirection='row'
      justifyContent='center'
      width={1}
      maxWidth={535}
      border={1}
      borderColor='customGrey.STROKE_FORM_OPACITY_20'
      borderRadius={2.5}
      sx={styles}
    >
      <LoginSignInFormGoogleAuth />
    </Stack>
  );
};
