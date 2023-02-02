import { type FC } from 'react';
import { Box, Divider } from '@mui/material';
import { MainMenuSlideBarHeader } from './components/MainMenuSlideBarHeader';
import { MainMenuFooter } from '../MainMenuFooter';
import { MainMenuPanels } from '../MainMenuPanels';
import { useDrawer } from 'hooks/useDrawer';
import { styles } from './styles';

export const MainMenuSlideBar: FC = (): JSX.Element => {
  const { drawerWidth } = useDrawer();

  return (
    <Box
      component='nav'
      width={1}
      height='100vh'
      maxWidth={drawerWidth}
      bgcolor='primary.contrastText'
      sx={styles}
    >
      <MainMenuSlideBarHeader />
      <Divider />
      <MainMenuPanels />
      <Divider />
      <MainMenuFooter />
    </Box>
  );
};
