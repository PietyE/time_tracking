import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { styles } from './styles';

export const LoginSignInFormHeader: FC = (): JSX.Element => (
  <Stack
    justifyContent='center'
    alignItems='center'
    sx={styles}
  >
    <Typography
      variant='h4'
      gutterBottom
    >
      Sign in
    </Typography>
    <Typography variant='body1'>Sign in into Vilmate time reporter</Typography>
  </Stack>
);
