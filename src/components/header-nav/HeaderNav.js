import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import "./headerNav.css";

function HeaderNav() {
  const activeTabStale = {
    color: "#249c98"
  };
  return (
    <ul className="nav_section_container">
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
  );
}

export default memo(HeaderNav);
