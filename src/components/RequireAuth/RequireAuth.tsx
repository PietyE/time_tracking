import {AppRoutes} from "constants/appRoutesConstants";

import {useAppSelector} from "hooks/redux";
import React from "react";
import {Navigate} from "react-router-dom";
import {getIsAuthProfileSelector, getProfilePermissionsSelector} from "store/reducers/profile";
import {Permissions} from "../../constants/permissions";
import {isArrayHaveEveryElement} from "../../utils/isArrayHaveEveryElement";

interface PrivateRouteProps {
  children: React.ReactElement;
  permissions?: Permissions[]; /// roles which available access to this route
  navigateTo?: AppRoutes; /// if roles do not match then redirect to this prop
}

const RequireAuth: React.FC<PrivateRouteProps> = ({
  children,
  permissions,
  navigateTo = AppRoutes.root,
}) => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);
  const profilePermissions = useAppSelector(getProfilePermissionsSelector);

  const isUserHavePermissionToAccessPage: boolean = !!permissions && isArrayHaveEveryElement<Permissions>(permissions, profilePermissions)

  if (!isAuth) return <Navigate to={`/${AppRoutes.auth}`} replace />;

  if (!isUserHavePermissionToAccessPage)
    return <Navigate to={`/${navigateTo}`} replace />;

  return children;
};

export default RequireAuth;
