import { type FC } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { styles } from './styles';

export const LoginSignInFormCredentials: FC = (): JSX.Element => {
  return (
    <Stack
      width={1}
      sx={styles}
    >
      <TextField placeholder='Your email address' />
      <TextField
        placeholder='Your password'
        type='password'
      />
      <Button variant='contained'>Sign In</Button>
    </Stack>
  );
};
