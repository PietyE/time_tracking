import { type FC } from 'react';
import type { PanelButton } from 'components/MainMenu/components/MainMenuPanels/types';

interface Props {
  buttonItem: PanelButton;
}

export const MainMenuPanelsItemButton: FC<Props> = ({
  buttonItem,
}): JSX.Element => {
  console.log(buttonItem);
  return <div></div>;
};
