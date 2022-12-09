import { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { MainMenuPanelsItemButton } from './components/MainMenuPanelsItemButton';
import { useAppShallowSelector } from '../../../../../../hooks/redux';
import { getIsOpenMainMenuDrawer } from '../../../../../../redux/selectors/mainMenu';
import type { Panel } from 'components/MainMenu/components/MainMenuPanels/types';
import { styles } from './styles';

interface Props {
  panel: Panel;
}

export const MainMenuPanelsItem: FC<Props> = ({ panel }): JSX.Element => {
  const isOpenDrawer = useAppShallowSelector(getIsOpenMainMenuDrawer);
  return (
    <Box sx={styles}>
      {isOpenDrawer && (
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
