import { type FC } from 'react';
// import { MainMenuPanelsItemButton } from './components/MainMenuPanelsItemButton';
import { MainMenuPanelsItemButton } from './components/MainMenuPanelsItemButton';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';

interface Props {
  panel: Panel;
}

export const MainMenuPanelsItem: FC<Props> = ({ panel }): JSX.Element => {
  return (
    <div>
      {panel.items.map((buttonItem) => {
        return (
          <MainMenuPanelsItemButton
            key={buttonItem.label}
            buttonItem={buttonItem}
          />
        );
      })}
    </div>
  );
};
