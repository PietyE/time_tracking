import React, { memo } from "react";

import "./header.css";
import logo from "images/Logo2.svg";
import HeaderNav from "components/header-nav";
import HeadrePropfileSection from "components/headre-profile-section";

const Header = () => {
  console.log("render Header");
  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="header_section_container header_section_logo_container">
          <img src={logo} alt="logo" />
        </div>
        <div className="header_section_container header_section_nav_container">
          <HeaderNav />
        </div>
        <div className="header_section_container header_section_profile_container">
          <HeadrePropfileSection />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
