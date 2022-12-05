import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';

interface Props {
  title: string;
}

export const ModalHeader: FC<Props> = ({ title }): JSX.Element => (
  <Box sx={styles}>
    <Typography variant='h4'>{title}</Typography>
  </Box>
);
