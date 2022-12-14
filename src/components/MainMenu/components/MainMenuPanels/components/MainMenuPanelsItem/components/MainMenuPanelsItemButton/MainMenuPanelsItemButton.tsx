import { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NavButton } from 'shared/components/NavButton';
import type { classNameWithIsActiveNavLink } from 'shared/types';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';

interface Props {
  button: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  button,
}): JSX.Element => {
  const { label, pathname, icon } = button;
  const className: classNameWithIsActiveNavLink = ({ isActive }) =>
    isActive ? 'main_menu_link active' : 'main_menu_link';

  return (
    <NavLink
      to={pathname}
      className={className}
    >
      <NavButton
        label={label}
        icon={icon}
      />
    </NavLink>
  );
};
