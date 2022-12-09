import { type FC } from 'react';
import { getIsOpenMainMenuDrawer } from '../../../../redux/selectors/mainMenu';
import { ButtonsLabels } from '../MainMenuPanels/constants';
import { logout } from 'redux/asyncActions/profile';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { NavButton } from 'shared/components/NavButton/NavButton';
import Door from 'assets/svg/mainMenu/Door';

export const Logout: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppShallowSelector(getIsOpenMainMenuDrawer);

  const handleLogout = (): void => {
    void dispatch(logout());
  };

  return (
    <NavButton
      icon={<Door />}
      label={ButtonsLabels.LOGOUT}
      onClick={handleLogout}
      smallSize={isOpenDrawer}
    />
  );
};
