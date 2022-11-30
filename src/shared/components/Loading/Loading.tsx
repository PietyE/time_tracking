import type { FC } from 'react';
import { Stack } from '@mui/material';
import Spinner from 'shared/UI/Spinner';
import { styles } from './styles';

const Loading: FC = () => {
  return (
    <Stack
      position='fixed'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      bgcolor='background.grey'
      sx={styles}
    >
      <Spinner
        size={60}
        color='primary'
      />
    </Stack>
  );
};

export default Loading;
