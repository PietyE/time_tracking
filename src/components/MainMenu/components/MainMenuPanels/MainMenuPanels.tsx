import { type FC } from 'react';
import { Box } from '@mui/material';
import { MainMenuPanelsItem } from './components/MainMenuPanelsItem';
import { getMainMenuPanels } from 'redux/selectors/mainMenu';
import { useAppShallowSelector } from 'hooks/redux';
import { styles } from './styles';

export const MainMenuPanels: FC = (): JSX.Element => {
  const panels = useAppShallowSelector(getMainMenuPanels);

  return (
    <Box sx={styles}>
      {panels.map((panel) => (
        <MainMenuPanelsItem
          key={panel.panelName}
          panel={panel}
        />
      ))}
    </Box>
  );
};
