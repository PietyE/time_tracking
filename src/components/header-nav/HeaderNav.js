import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";

import "./headerNav.css";

function HeaderNav() {
  const [isOpenMenu, setstateMenu] = useState(false);
  const activeTabStale = {
    color: "#249c98"
  };
  const handlerOpneMenu = () => {
    setstateMenu(!isOpenMenu);
  };
  const classWhenOpenMenu = isOpenMenu ? "open_menu" : "";
  return (
    <>
      <button className="mobile_open_btn" onClick={handlerOpneMenu}>
        <span className="mobile_btn_line"></span>
      </button>
      <ul className={`nav_section_container ${classWhenOpenMenu}`}>
        <button
          className="mobile_open_btn mobile_open_btn_two"
          onClick={handlerOpneMenu}
        >
          <span className="mobile_btn_line"></span>
        </button>
        <li className="nav_item">
          <NavLink
            to="/blog"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            BLOG
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink
            to="/wiki"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            WIKI
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink
            to="/vacation"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            VACATION
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink
            to="/timereport"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            TIMEREPORT
          </NavLink>
        </li>
      </ul>
    </>
  );
}

export default memo(HeaderNav);
