import type { FC, PropsWithChildren } from 'react';
import { Link, useMatch } from 'react-router-dom';

import { Box, Button } from '@mui/material';
import { useAppDispatch } from 'hooks/redux';
import { logout } from 'redux/asyncActions/profile';
import { AppRoutes } from 'constants/appRoutesConstants';

interface ItemMenuPropsI {
  to: AppRoutes;
}

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
      <ul>
        <ItemMenu to={AppRoutes.timeReport}>Time Report</ItemMenu>
        <ItemMenu to={AppRoutes.projectReport}>Project Report</ItemMenu>
      </ul>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </Box>
  );
};

export default MainMenu;

const ItemMenu: FC<PropsWithChildren<ItemMenuPropsI>> = ({ to, children }) => {
  const match = useMatch(to);

  return (
    <li
      style={{
        backgroundColor: match ? 'rgba(187,187,205, 0.5)' : 'unset',
        padding: '12px',
      }}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};
