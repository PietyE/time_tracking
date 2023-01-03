import { type FC } from 'react';
import { ButtonsLabels } from 'components/MainMenu/components/MainMenuPanels/constants';
import Door from 'shared/components/svg/mainMenu/Door';
import { useAppDispatch } from 'hooks/redux';
import { logout } from 'redux/asyncActions/profile';
import { NavButton } from 'shared/components/NavButton/NavButton';

export const MainMenuFooterLogout: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    void dispatch(logout());
  };

  return (
    <NavButton
      icon={<Door />}
      label={ButtonsLabels.LOGOUT}
      onClick={handleLogout}
    />
  );
};
