import type { FC } from 'react';
import { Divider, Stack } from '@mui/material';
import { LoginSignInFormCredentials } from './components/LoginSignInFormCredentials';

import { LoginSignInFormHeader } from './components/LoginSignInFormHeader';
import LoginSignInFormGoogleAuth from 'components/Login/components/LoginSignInForm/components/LoginSignInFormGoogleAuth';
import { styles } from './styles';

export const LoginSignInForm: FC = () => (
  <Stack
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
    width={1}
    maxWidth={{
      xs: 345,
      sm: 535,
    }}
    border={1}
    borderColor='customGrey.STROKE_FORM_OPACITY_20'
    borderRadius={2.5}
    sx={styles}
  >
    <LoginSignInFormHeader />
    <LoginSignInFormGoogleAuth />
    <Divider flexItem>or</Divider>
    <LoginSignInFormCredentials />
  </Stack>
);
