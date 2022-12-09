import { type FC } from 'react';
import { Box, Divider } from '@mui/material';
import { Logout } from './components/Logout';
import { MainMenuHeader } from './components/MainMenuHeader';
import { MainMenuPanels } from './components/MainMenuPanels';
import { useDrawer } from 'hooks/useDrawer/useDrawer';

const MainMenu: FC = () => {
  const { drawerWidth } = useDrawer();
  return (
    <Box
      component='nav'
      width={1}
      maxWidth={drawerWidth}
      height='100vh'
      bgcolor='primary.contrastText'
    >
      <MainMenuHeader />
      <Divider />
      <MainMenuPanels />
      <Divider />
      {/*  TODO: make Box below as separated parent component for buttons if we will add other buttons except of Logout
       */}
      <Box sx={{ py: 25 }}>
        <Logout />
      </Box>
    </Box>
  );
};

export default MainMenu;
