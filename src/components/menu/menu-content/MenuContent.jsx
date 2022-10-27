import ArrowUp from 'components/ui/arrowUp'
import UserAvatar from 'components/ui/profile-avatar'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import clock from 'images/sideMenuIcons/clock.svg'
import coin from 'images/sideMenuIcons/coin.svg'
import door from 'images/sideMenuIcons/door.svg'
import fileCheck from 'images/sideMenuIcons/fileCheck.svg'
import vilmates from 'images/vilmates/vilmates.svg'
import React, { useMemo } from 'react'
import {
  getProfileName,
  getProfileShowSideMenuArrow,
  getUserPermissions,
  getUserRoleText,
} from 'selectors/user'
import Logout from '../components/Logout'
import SideBarMenu from '../components/SideBarMenu'
import { userPermissions } from '../../../constants/permissions'

// permissions?.includes(users_can_view_projectmanagement) proejctmanagement
// permissions?.includes(userPermissions.users_can_view_vilmates) vilmates

export const MenuContent = () => {
  const userName = useShallowEqualSelector(getProfileName)
  const showArrow = useShallowEqualSelector(getProfileShowSideMenuArrow)
  const userRole = useShallowEqualSelector(getUserRoleText)
  const permissions = useShallowEqualSelector(getUserPermissions)

  const panels = useMemo(() => {
    const tabs = []

    tabs.push(
      {
        panelName: 'My work',
        panelId: '...',
        smallSize: true,
        items:
          permissions?.includes(userPermissions.users_can_view_vilmates) ||
          userRole !== 'Developer'
            ? [
                {
                  icon: clock,
                  label: 'Time report',
                  smallSize: true,
                  pathname: '/timereport',
                },
                {
                  icon: vilmates,
                  label: 'Vilmates',
                  smallSize: true,
                  pathname: '/vilmates',
                },
              ]
            : [
                {
                  icon: clock,
                  label: 'Time report',
                  smallSize: true,
                  pathname: '/timereport',
                },
              ],
      },
      {
        panelName: 'Accounting',
        panelId: '...',
        smallSize: true,
        items: [
          {
            icon: coin,
            label: 'Project report',
            smallSize: true,
            pathname: '/projectreport',
          },
        ],
      }
    )
    if (
      permissions?.includes(userPermissions.users_can_view_projectmanagement) ||
      userRole === 'Admin' ||
      userRole === 'Project Management'
    )
      tabs.push({
        panelName: 'Management',
        panelId: '...',
        items: [
          {
            icon: fileCheck,
            label: 'Project management',
            pathname: '/projectmanagement',
          },
        ],
      })
    return tabs
  }, [permissions, userRole])

  return (
    <div className="side_menu_container-wrapper">
      <div className="side_menu_user_info">
        <div className="user_avatar">
          <UserAvatar />
        </div>
        <div className="user_info">
          <span className="user_role">{userRole}</span>
          <span className="user_name">{userName}</span>
        </div>
      </div>
      <div className="div_row" />
      <div className="sidebar_menu">
        <SideBarMenu panels={panels} />
      </div>
      <div className="sidebar_footer">
        <Logout img={door} />
      </div>
      <div className="arrow_container">
        {showArrow ? <ArrowUp isActive /> : null}
      </div>
    </div>
  )
}
