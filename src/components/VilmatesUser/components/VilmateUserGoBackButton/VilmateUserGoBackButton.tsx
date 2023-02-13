import { type FC } from 'react';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Box, Link, Typography } from '@mui/material';
import { AppRoutes } from 'constants/appRoutesConstants';
import { styles } from './styles';

export const VilmateUserGoBackButton: FC = (): JSX.Element => (
  <Link
    href={`/${AppRoutes.vilmates}`}
    maxWidth={170}
    display='block'
    underline='none'
  >
    <Box
      display='flex'
      justifyContent='flex-start'
      alignItems='center'
      sx={styles}
    >
      <ArrowCircleLeftOutlinedIcon color='primary' />
      <Typography
        variant='subtitle2'
        color='primary'
      >
        Back to people list
      </Typography>
    </Box>
  </Link>
);
