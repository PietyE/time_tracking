import React, { useContext } from 'react'

import collapseButton from 'images/sideMenuIcons/collapseButton.svg'

import {SidebarContext} from 'context/sidebar-context'

const SidemenuButton = () => {
  const contextType = useContext(SidebarContext);

  const onClick = (e) => {
    e.stopPropagation()
  contextType.onOpenClick()
  }

  return(
    <div className="side_menu_button" onClick={onClick}>
      <img src={collapseButton} alt="collapseButton" className="collapseButton"/>
    </div>
  )
}

export default SidemenuButton;