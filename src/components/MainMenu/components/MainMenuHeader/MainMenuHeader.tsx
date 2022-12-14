import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuHeaderLogo } from './components/MainMenuHeaderLogo';
import { MainMenuHeaderUserInfo } from './components/MainMenuHeaderUserInfo';
import { useDrawer } from 'hooks/useDrawer';
import { createDynamicStyles } from './styles';

export const MainMenuHeader: FC = (): JSX.Element => {
  const { LogoAndUserInfoSeparator, isDrawerOpen } = useDrawer();
  return (
    <Box sx={createDynamicStyles(isDrawerOpen)}>
      <MainMenuHeaderLogo />
      {LogoAndUserInfoSeparator}
      <MainMenuHeaderUserInfo />
    </Box>
  );
};
