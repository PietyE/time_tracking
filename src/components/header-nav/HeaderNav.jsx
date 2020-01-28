import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./headerNav.css";

function HeaderNav() {
  const [isOpenMenu, setStateMenu] = useState(false);
  
  const activeTabStale = {
    color: "#249c98"
  };
  
  const handlerOpenMenu = () => {
    setStateMenu(!isOpenMenu);
  
  };

  const callbackEventListener = () => {
    setStateMenu(false);
    document.removeEventListener("click", callbackEventListener);
  };
  
  useEffect(() => {
    if(isOpenMenu) {
      document.addEventListener("click", callbackEventListener);
    }
  }, [isOpenMenu]);

  useEffect(() => {
    const _clear = () => {
      document.removeEventListener("click", callbackEventListener);
    }
    return () => {
      _clear()
    };
  }, []);

  const classWhenOpenMenu = isOpenMenu ? "open_menu" : "";
  return (
    <>
      <button
        className={`mobile_open_btn ${classWhenOpenMenu}`}
        onClick={handlerOpenMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav_section_container ${classWhenOpenMenu}`}>
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
