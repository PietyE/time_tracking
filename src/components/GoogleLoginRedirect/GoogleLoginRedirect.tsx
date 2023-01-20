import { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useGoogleAuth } from './helpers';
import { useAppSelector } from 'hooks/redux';
import {
  getIsAuthProfileSelector,
  getProfileGoogleAuthAccessDenied,
} from 'redux/selectors/profile';
import { AppRoutes } from 'constants/appRoutesConstants';
import Loading from 'shared/components/Loading';

export const GoogleLoginRedirect: FC = (): JSX.Element => {
  const { state } = useGoogleAuth();
  const isAuth = useAppSelector(getIsAuthProfileSelector);
  const isAccessDenied = useAppSelector(getProfileGoogleAuthAccessDenied);

  if (isAccessDenied) {
    return (
      <Navigate
        to={`/${AppRoutes.auth}`}
        replace
      />
    );
  }

  if (!state)
    return (
      <Navigate
        to={`/${AppRoutes.auth}`}
        replace
      />
    );

  if (isAuth)
    return (
      <Navigate
        to={AppRoutes.root}
        replace
      />
    );

  return <Loading />;
};
