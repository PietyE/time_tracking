import { type FC, type PropsWithChildren, memo } from 'react';
import { Divider, Typography, Box } from '@mui/material';
import { styles } from './styles';

interface Props {
  title: string;
}

const PageHeader: FC<PropsWithChildren<Props>> = ({ title, children }) => (
  <Box
    sx={styles}
    component='header'
  >
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <Typography
        variant='h4'
        flex='1 1 auto'
      >
        {title}
      </Typography>
      {children}
    </Box>
    <Divider />
  </Box>
);

export const MemoizedPageHeader = memo(PageHeader);
