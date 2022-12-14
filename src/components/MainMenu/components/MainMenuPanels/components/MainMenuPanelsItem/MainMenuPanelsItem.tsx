import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { MainMenuPanelsItemButton } from './components/MainMenuPanelsItemButton';
import { useDrawer } from 'hooks/useDrawer';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';
import { createDynamicStyles } from './styles';

interface Props {
  panel: Panel;
}

export const MainMenuPanelsItem: FC<Props> = ({ panel }): JSX.Element => {
  const { isDrawerOpen } = useDrawer();
  return (
    <Box sx={createDynamicStyles(isDrawerOpen)}>
      {isDrawerOpen && (
        <Typography
          variant='subtitle2'
          color='black.400'
        >
          {panel.panelName}
        </Typography>
      )}
      {panel.buttons.map((button) => (
        <MainMenuPanelsItemButton
          key={button.label}
          button={button}
        />
      ))}
    </Box>
  );
};
