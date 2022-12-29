import { type FC, type PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';

export const ValidationErrorMessage: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => (
  <Box
    position='absolute'
    top='110%'
  >
    <Typography
      component='small'
      variant='body2'
      color='error.main'
      fontWeight='fontWeightSemiBold'
    >
      {children}
    </Typography>
  </Box>
);
