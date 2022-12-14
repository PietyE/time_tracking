import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  getIsAuthProfileSelector,
  getProfilePermissionsSelector,
} from 'redux/selectors/profile';
import { isArrayHaveEveryElement } from 'shared/utils/isArrayHaveEveryElement';
import { useAppShallowSelector } from 'hooks/redux';
import { AppRoutes } from 'constants/appRoutesConstants';
import type { Permissions } from 'constants/permissions';

interface PrivateRouteProps {
  children: React.ReactElement;
  permissions?: Permissions[]; /// permissions which available access to this route
  navigateTo?: AppRoutes; /// if roles do not match then redirect to this prop
}

const RequireAuth: React.FC<PrivateRouteProps> = ({
  children,
  permissions,
  navigateTo = AppRoutes.timeReport,
}) => {
  const isAuth = useAppShallowSelector(getIsAuthProfileSelector);
  const profilePermissions = useAppShallowSelector(
    getProfilePermissionsSelector,
  );

  if (!isAuth)
    return (
      <Navigate
        to={`/${AppRoutes.auth}`}
        replace
      />
    );

  if (
    !!permissions &&
    !isArrayHaveEveryElement<Permissions>(permissions, profilePermissions)
  )
    return (
      <Navigate
        to={`/${navigateTo}`}
        replace
      />
    );

  return children;
};

export default RequireAuth;
