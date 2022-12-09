import type { ReactElement } from 'react';
import { Divider, type SxProps, type Theme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { DrawerWidth, ToggleButtonPadding } from './contants';
import { useAppShallowSelector } from '../redux';
import Logo from 'assets/svg/Logo';
import VilmateIcon from 'assets/svg/VilmateIcon';
import { getIsOpenMainMenuDrawer } from 'redux/selectors/mainMenu';
import { toggleDrawer } from 'redux/slices/mainMenu';
import type { DrawerToggleHandler, UseDrawerReturnType } from './types';
import { styles } from './styles';

export const useDrawer = (): UseDrawerReturnType => {
  const isDrawerOpen = useAppShallowSelector(getIsOpenMainMenuDrawer);
  const dispatch = useDispatch();

  const handleToggle: DrawerToggleHandler = (): void => {
    void dispatch(toggleDrawer());
  };

  const drawerWidth: number = isDrawerOpen
    ? DrawerWidth.DESKTOP
    : DrawerWidth.LAPTOP;

  const LogoAndUserInfoSeparator: ReactElement | false = !isDrawerOpen && (
    <Divider sx={styles.logoAndUserInfoSeparator} />
  );

  const LogoAndDrawerToggleButtonSeparator: ReactElement | false =
    !isDrawerOpen && <Divider sx={styles.logoAndDrawerToggleButtonSeparator} />;

  const MainMenuLogo: ReactElement = isDrawerOpen ? <Logo /> : <VilmateIcon />;

  const toggleButtonStyles: SxProps<Theme> = {
    pt: isDrawerOpen ? ToggleButtonPadding.DESKTOP : ToggleButtonPadding.LAPTOP,
    '&:hover': {
      background: 'none',
    },
  };

  return {
    isDrawerOpen,
    handleToggle,
    drawerWidth,
    LogoAndUserInfoSeparator,
    MainMenuLogo,
    LogoAndDrawerToggleButtonSeparator,
    toggleButtonStyles,
  };
};
