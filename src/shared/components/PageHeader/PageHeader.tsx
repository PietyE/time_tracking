import { type FC } from 'react';
import { Divider, Typography, Box } from '@mui/material';
import { styles } from './styles';

interface Props {
  name: string;
}

export const PageHeader: FC<Props> = ({ name }) => (
  <Box sx={styles}>
    <Typography variant='h4'>{name}</Typography>
    <Divider />
  </Box>
);
