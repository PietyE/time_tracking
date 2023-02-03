import type { FC } from 'react';
import { Stack } from '@mui/material';
import Spinner from 'shared/UI/Spinner';

const Loading: FC = () => {
  return (
    <Stack
      position='fixed'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      width={1}
      height={1}
      top={0}
      left={0}
      zIndex='10000000'
      sx={{
        backdropFilter: 'blur(15px)',
      }}
    >
      <Spinner
        size={60}
        color='primary'
      />
    </Stack>
  );
};

export default Loading;
