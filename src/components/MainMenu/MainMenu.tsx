import React from "react";
import { Link, useMatch } from "react-router-dom";

import { AppRoutes } from "constants/appRoutesConstants";
import { Button } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { logout } from "store/asyncActions/profile";

interface ItemMenuPropsI {
  to: AppRoutes;
}

const MainMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="menu_container">
      <ul>
        <ItemMenu to={AppRoutes.timeReport}>Time Report</ItemMenu>
        <ItemMenu to={AppRoutes.projectReport}>Project Report</ItemMenu>
      </ul>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </nav>
  );
};

export default MainMenu;

const ItemMenu: React.FC<React.PropsWithChildren<ItemMenuPropsI>> = ({
  to,
  children,
}) => {
  const match = useMatch(to);

  return (
    <li
      style={{
        backgroundColor: match ? "rgba(187,187,205, 0.5)" : "unset",
        padding: "12px",
      }}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};
