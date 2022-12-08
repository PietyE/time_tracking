import type { FC } from 'react';
import { Stack } from '@mui/material';

import GoogleSignIn from 'components/GoogleSignIn';
import { styles } from './styles';

const SignInForm: FC = () => {
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
      <GoogleSignIn />
    </Stack>
  );
};

export default SignInForm;
