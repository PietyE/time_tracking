import { type FC } from 'react';
import { Divider, Typography, Box } from '@mui/material';
import { styles } from './styles';

interface Props {
  title: string;
}

export const PageHeader: FC<Props> = ({ title }) => (
  <Box sx={styles}>
    <Typography variant='h4'>{title}</Typography>
    <Divider />
  </Box>
);
