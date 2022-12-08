import { type FC } from 'react';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';

interface Props {
  button: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  button,
}): JSX.Element => {
  console.log(button);
  return <div></div>;
};
