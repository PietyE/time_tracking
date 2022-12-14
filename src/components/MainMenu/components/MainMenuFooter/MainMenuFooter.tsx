import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuFooterLogout } from './components/MainMenuFooterLogout';
import { styles } from './styles';

export const MainMenuFooter: FC = (): JSX.Element => (
  <Box sx={styles}>
    <MainMenuFooterLogout />
  </Box>
);
