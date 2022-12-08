import type { FC } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { MainMenuHeader } from './components/MainMenuHeader';
import { useAppDispatch } from 'hooks/redux';
import { logout } from 'redux/asyncActions/profile';
// import { AppRoutes } from 'constants/appRoutesConstants';

const MainMenu: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Box
      component='nav'
      width={1}
      maxWidth={260}
      height='100vh'
      bgcolor='primary.contrastText'
    >
      <MainMenuHeader />
      <Divider />
      <ul></ul>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Box>
  );
};

export default MainMenu;
