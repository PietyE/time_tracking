import { type FC } from 'react';
import { Box, Divider } from '@mui/material';
import { Logout } from './components/Logout';
import { MainMenuHeader } from './components/MainMenuHeader';
import { MainMenuPanels } from './components/MainMenuPanels';

const MainMenu: FC = () => (
  <Box
    component='nav'
    width={1}
    maxWidth={260}
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

export default MainMenu;
