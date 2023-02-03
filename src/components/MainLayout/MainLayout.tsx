import { type FC, memo } from 'react';
import { Box } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsAuthProfileSelector } from 'redux/selectors/profile';
import { MainContainer } from 'shared/UI/MainContainer';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import MainMenu from 'components/MainMenu';
import { styles } from './styles';

const MainLayout: FC = () => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);

  if (!isAuth)
    return (
      <Navigate
        to={AppRoutes.auth}
        replace
      />
    );

  return (
    <Box
      width={1}
      minHeight='100vh'
      sx={styles}
    >
      <MainMenu />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Box>
  );
};

export default memo(MainLayout);
