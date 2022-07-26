import React from 'react'
import PropTypes from 'prop-types'

import collapseButton from 'images/sideMenuIcons/collapseButton.svg'

// TODO: Replace with CustomButton component
export const SideMenuButton = ({ onClick }) => (
  <div className="side_menu_button" onClick={onClick}>
    <img src={collapseButton} alt="collapseButton" className="collapseButton" />
  </div>
)

SideMenuButton.propTypes = {
  onClick: PropTypes.func,
}
