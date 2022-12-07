import { type FC, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MainContainer } from 'shared/UI/MainContainer';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppShallowSelector } from 'hooks/redux';
import { getIsAuthProfileSelector } from 'redux/slices/profile';
import MainMenu from 'components/MainMenu';

const MainLayout: FC = () => {
  const isAuth = useAppShallowSelector(getIsAuthProfileSelector);

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
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default memo(MainLayout);
