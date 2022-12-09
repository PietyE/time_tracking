import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuHeaderLogo } from 'components/MainMenu/components/MainMenuHeaderLogo';
import { MainMenuUserInfo } from 'components/MainMenu/components/MainMenuUserInfo';
import { useDrawer } from 'hooks/useDrawer';
import { createDynamicStyles } from './styles';

export const MainMenuSlideBarHeader: FC = (): JSX.Element => {
  const { LogoAndUserInfoSeparator, isDrawerOpen } = useDrawer();
  return (
    <Box sx={createDynamicStyles(isDrawerOpen)}>
      <MainMenuHeaderLogo />
      {LogoAndUserInfoSeparator}
      <MainMenuUserInfo />
    </Box>
  );
};
