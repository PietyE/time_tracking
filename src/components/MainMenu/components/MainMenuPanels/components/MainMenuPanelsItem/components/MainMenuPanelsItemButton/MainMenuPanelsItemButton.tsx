import { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import { mainMenuButtonsIcons } from 'components/MainMenu/mocks';
import { NavButton } from 'shared/components/NavButton';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';

interface Props {
  button: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  button,
}): JSX.Element => {
  const { label, pathname, icon } = button;
  const className: ClassNameWithIsActiveNavLink = ({ isActive }) =>
    isActive ? 'main_menu_link active' : 'main_menu_link';

  const Icon = mainMenuButtonsIcons[icon];

  return (
    <NavLink
      to={pathname}
      className={className}
    >
      <NavButton
        label={label}
        icon={Icon}
      />
    </NavLink>
  );
};
