import { type FC } from 'react';
import { ButtonsLabels } from '../MainMenuPanels/constants';
import { NavButton } from 'shared/components/NavButton/NavButton';
import Door from 'assets/svg/mainMenu/Door';

export const Logout: FC = (): JSX.Element => {
  return (
    <NavButton
      icon={<Door />}
      label={ButtonsLabels.LOGOUT}
    />
  );
};
