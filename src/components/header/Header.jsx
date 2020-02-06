import React, { memo } from 'react'

import './header.css'
import logo from 'images/Logo2.svg'
import HeaderNav from 'components/header-nav'
import HeaderProfileSection from 'components/header-profile-section'

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_wrap">
        <div className="header_section_container header_section_logo_container">
          <img src={logo} alt="logo" className={'company_logo'} />
        </div>
        <div className="header_section_container header_section_nav_container">
          <HeaderNav />
        </div>
        <div className="header_section_container header_section_profile_container">
          <HeaderProfileSection />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
