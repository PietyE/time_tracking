import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuHeaderLogo } from './components/MainMenuHeaderLogo';
import { MainMenuHeaderUserInfo } from './components/MainMenuHeaderUserInfo';
import { useDrawer } from 'hooks/useDrawer';
import { styles } from './styles';

export const MainMenuHeader: FC = (): JSX.Element => {
  const { LogoAndUserInfoSeparator } = useDrawer();
  return (
    <Box sx={styles}>
      <MainMenuHeaderLogo />
      {LogoAndUserInfoSeparator}
      <MainMenuHeaderUserInfo />
    </Box>
  );
};
