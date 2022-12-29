import type { ReactElement } from 'react';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { DrawerWidth } from './contants';
import { useAppSelector } from '../redux';
import Logo from 'assets/svg/Logo';
import VilmateIcon from 'assets/svg/VilmateIcon';
import { getIsOpenMainMenuDrawer } from 'redux/selectors/mainMenu';
import { toggleDrawer } from 'redux/slices/mainMenu';
import type { DrawerToggleHandler, UseDrawerReturnType } from './types';
import { styles } from './styles';

export const useDrawer = (): UseDrawerReturnType => {
  const isDrawerOpen = useAppSelector(getIsOpenMainMenuDrawer);
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

  return {
    isDrawerOpen,
    handleToggle,
    drawerWidth,
    LogoAndUserInfoSeparator,
    MainMenuLogo,
    LogoAndDrawerToggleButtonSeparator,
  };
};
