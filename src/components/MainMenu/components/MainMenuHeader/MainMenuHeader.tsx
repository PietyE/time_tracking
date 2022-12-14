import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuHeaderLogo } from './components/MainMenuHeaderLogo';
import { MainMenuHeaderUserInfo } from './components/MainMenuHeaderUserInfo';
import { styles } from './styles';

export const MainMenuHeader: FC = (): JSX.Element => (
  <Box sx={styles}>
    <MainMenuHeaderLogo />
    <MainMenuHeaderUserInfo />
  </Box>
);
