import type { FC, ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { styles } from './styles';

export const MainContainer: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => (
  <Container
    maxWidth='xl'
    component='main'
    disableGutters
    sx={styles}
  >
    <Box maxWidth={971}>{children}</Box>
  </Container>
);
