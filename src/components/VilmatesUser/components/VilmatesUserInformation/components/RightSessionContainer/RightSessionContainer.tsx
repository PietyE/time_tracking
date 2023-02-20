import type { FC, PropsWithChildren } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { styles } from './style';

interface Props {
  title: string;
  height?: number;
}

export const RightSessionContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  height,
}): JSX.Element => (
  <Box
    position='relative'
    maxWidth={626}
    px={25}
    py={20}
    bgcolor='common.white'
    border={1}
    borderColor='customGrey.STROKE_OPACITY_40'
    borderRadius={2.5}
    component='section'
    height={height}
  >
    <Typography
      mb={18}
      fontWeight='fontWeightSemiBold'
      variant='h6'
    >
      {title}
    </Typography>
    <Divider
      variant='fullWidth'
      sx={styles}
    />
    <Box pt={30}>{children}</Box>
  </Box>
);
