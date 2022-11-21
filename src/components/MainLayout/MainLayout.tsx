import { type FC, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'store/reducers/profile';
import MainMenu from 'components/MainMenu';

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
    <div className='container'>
      <MainMenu />
      <Outlet />
    </div>
  );
};

export default memo(MainLayout);
