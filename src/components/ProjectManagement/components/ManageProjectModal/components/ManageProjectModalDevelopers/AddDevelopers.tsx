import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';

export const AddDevelopers: FC = (): JSX.Element => (
  <Box bgcolor='customGrey.STROKE_OPACITY_40'>
    <Box
      display='flex'
      alignItems='center'
      justifyContent='flex-start'
      color='primary.main'
      flexShrink={1}
      py={18}
      px={24}
      sx={{
        cursor: 'pointer',
        '& svg': {
          mr: 10,
        },
      }}
    >
      <Add />
      <Typography variant='subtitle2'>Add new developers</Typography>
    </Box>
  </Box>
);
