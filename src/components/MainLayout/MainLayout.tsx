import React, { memo } from "react";
import { Outlet } from "react-router-dom";

import MainMenu from "components/MainMenu";

const MainLayout = () => {
  console.count("render MainLayout");
  return (
    <div className="container">
      <MainMenu />
      <Outlet />
    </div>
  );
};

export default memo(MainLayout);
