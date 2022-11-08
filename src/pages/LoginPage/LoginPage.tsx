import React from "react";
import { Navigate } from "react-router-dom";

import { AppRoutes } from "constants/appRoutesConstants";
import { getIsAuthProfileSelector } from "store/reducers/profile";
import { useAppSelector } from "hooks/redux";

import LogoSvg from "components/common/svg/Logo";
import SignInForm from "./components/SignInForm";

const LoginPage = () => {
  const isAuth = useAppSelector(getIsAuthProfileSelector);

  if (isAuth) {
    return <Navigate to={AppRoutes.root} replace />;
  }

  return (
    <div className="login-page">
      <LogoSvg className="login-page__logo" />
      <SignInForm />
    </div>
  );
};

export default LoginPage;
