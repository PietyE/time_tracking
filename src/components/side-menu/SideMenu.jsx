import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getProfileName, getUserRoleText } from '../../selectors/user'

import clock from 'images/sideMenuIcons/clock.svg'
import people from 'images/sideMenuIcons/people.svg'
import schedule from 'images/sideMenuIcons/schedule.svg'
import coin from 'images/sideMenuIcons/coin.svg'
import house from 'images/sideMenuIcons/house.svg'
import arrowDownCircul from 'images/sideMenuIcons/arrowDownCircul.svg'
import basket from 'images/sideMenuIcons/basket.svg'
import fileCheck from 'images/sideMenuIcons/fileCheck.svg'
import questionCircle from 'images/sideMenuIcons/questionCircle.svg'
import door from 'images/sideMenuIcons/door.svg'

import {SidebarContext} from 'context/sidebar-context'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import './sideMenu.scss'
import UserAvatar from 'components/ui/profile-avatar'
import Logo from './components/Logo'
import Company from './components/Company'
import SidemenuButton from './components/SidemenuButton'
import SideBarMenu from './components/SideBarMenu'
import HelpCenter from './components/HelpCenter'
import Logout from './components/Logout'

function SideMenu () {

  const userName = useShallowEqualSelector (getProfileName);
  const userRole = useShallowEqualSelector (getUserRoleText);
  const [selected, setSelected] = useState(null);
  const [openSideMenu, setOpened] = useState(true);

  const panels = useMemo(()=>{
    const result = [{
      panelName: "My work",
      panelId: "...",
      smallSize: true,
      items: [
        {icon: clock, label: "Time report", smallSize: true, pathname: "/timereport"},
        // {icon: people, label: "Vilmates", smallSize: true, pathname: "/profile"},
        // {icon: people, label: "People", smallSize: true, pathname: "/people"}
      ]
    }]
    if((userRole === "Accountant" ||
      userRole === "Admin")){
      result.push({
        panelName: "Accounting",
        panelId: "...",
        smallSize: true,
        items: [
          // {icon: schedule, label: "Total overview", pathname: "/totaloverview"},
          {icon: coin, label: "Project report", smallSize: true, pathname: "/projectreport", subItems: [
            {icon: house, label: "In-house employees", pathname: "/inhouseemployees"},
            {icon: arrowDownCircul, label: "Remote contractors", pathname: "/remotecontractors"},
          ]},
          // {icon: basket, label: "Other costs", pathname: "/othercosts"}
        ]
      },
      // {
      //   panelName: "Management",
      //   panelId: "...",
      //   items: [
      //     {icon: fileCheck, label: "Project management", pathname: "/projectmanagement"}
      //   ]
      // }
      )
    } else if (userRole === "Developer") {
      result.push({
        panelName: "Accounting",
        panelId: "...",
        smallSize: true,
        items: [
          {icon: coin, label: "Project report", smallSize: true, pathname: "/projectreport"}
        ]

      })
    } else if (userRole === "Project manager") {
        result.push({
          panelName: "Accounting",
          panelId: "...",
          smallSize: true,
          items: [
            {icon: coin, label: "Project report", smallSize: true, pathname: "/projectreport"}
          ]
        },
        // {
        //   panelName: "Management",
        //   panelId: "...",
        //   items: [
        //     {icon: fileCheck, label: "Project management", pathname: "/projectmanagement"}
        //   ]
        // }
        )
      }
      return result;
  }, [userRole])

  const sideMenuOnOpen = () => {
   setOpened(!openSideMenu)
 }

  const buttonRouteTo = (item) => {
    if (item) {
      if(item === selected){
        setSelected(null)
      } else {
        setSelected(item)
      }
    }
  }

  return(
    <SidebarContext.Provider value={{selected, onItemClick: buttonRouteTo, onOpenClick: sideMenuOnOpen}}>
      {openSideMenu && (
        <div className="side_menu_container">
          <div className="side_menu_wrap">
            <Logo />
            <Company />
            <SidemenuButton />
          </div>
          <div className="side_menu_user_info">
            <div className="user_avatar">
              <UserAvatar />
            </div>
            <div className="user_info">
              <span className="user_role">{ userRole }</span>
              <span className="user_name">{ userName }</span>
            </div>
          </div>
          <div className="div_row" />
            <div className="sidebar_menu">
              <SideBarMenu panels={panels}/>
            </div>
            <div className="div_row2" />
            <div className="sidebar_footer">
              <HelpCenter img={questionCircle}/>
              <Logout img={door}/>
            </div> 
        </div>
      )} 
      {!openSideMenu &&
        <div className="side_menu_container_close">
            {/* <SidemenuButton /> */}
            <div className="side_menu_wrap">
            <Logo />
            {/* <Company /> */}
            <SidemenuButton />
          </div>
          <div className="side_menu_user_info">
            <div className="user_avatar">
              <UserAvatar />
            </div>
            <div className="user_info">
              <span className="user_role">{ userRole }</span>
              <span className="user_name">{ userName }</span>
            </div>
          </div>
          <div className="div_row" />
            <div className="sidebar_menu">
              <SideBarMenu panels={panels}/>
            </div>
            <div className="div_row2" />
            <div className="sidebar_footer">
              <HelpCenter img={questionCircle}/>
              <Logout img={door}/>
            </div> 
        </div>
      }
    </SidebarContext.Provider> 
  )
}

export default SideMenu