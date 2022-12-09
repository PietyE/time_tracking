import type { ReactElement } from 'react';

export type DrawerToggleHandler = () => void;

export interface UseDrawerReturnType {
  isDrawerOpen: boolean;
  handleToggle: DrawerToggleHandler;
  drawerWidth: number;
  LogoAndUserInfoSeparator: ReactElement | false;

  MainMenuLogo: ReactElement;

  LogoAndDrawerToggleButtonSeparator: ReactElement | false;
}
