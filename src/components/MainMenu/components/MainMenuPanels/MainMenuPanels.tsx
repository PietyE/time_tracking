import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuPanelsItem } from './components/MainMenuPanelsItem';
import { useDrawer } from 'hooks/useDrawer';
import { getMainMenuPanels } from 'redux/selectors/mainMenu';
import { useAppShallowSelector } from 'hooks/redux';
import { createDynamicStyles } from './styles';

export const MainMenuPanels: FC = (): JSX.Element => {
  const panels = useAppShallowSelector(getMainMenuPanels);
  const { isDrawerOpen } = useDrawer();

  return (
    <Box sx={createDynamicStyles(isDrawerOpen)}>
      {panels.map((panel) => (
        <MainMenuPanelsItem
          key={panel.panelName}
          panel={panel}
        />
      ))}
    </Box>
  );
};
