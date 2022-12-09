import type { ReactElement } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type DrawerToggleHandler = () => void;

export interface UseDrawerReturnType {
  isDrawerOpen: boolean;
  handleToggle: DrawerToggleHandler;
  drawerWidth: number;
  LogoAndUserInfoSeparator: ReactElement | false;

  MainMenuLogo: ReactElement;

  LogoAndDrawerToggleButtonSeparator: ReactElement | false;

  toggleButtonStyles: SxProps<Theme>;
}
