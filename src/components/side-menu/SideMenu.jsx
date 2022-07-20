// eslint-disable-next-line no-unused-vars
import React, { useState, useMemo, useCallback, useRef } from 'react'

import {
  getProfileName,
  getUserRoleText,
  getProfileShowSideMenuArrow,
} from '../../selectors/user'

import clock from 'images/sideMenuIcons/clock.svg'
import coin from 'images/sideMenuIcons/coin.svg'
import fileCheck from 'images/sideMenuIcons/fileCheck.svg'
import door from 'images/sideMenuIcons/door.svg'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import './sideMenu.scss'
import UserAvatar from 'components/ui/profile-avatar'
import Logo from './components/Logo'
import Company from './components/Company'
import { SideMenuButton } from './components/SideMenuButton'
import SideBarMenu from './components/SideBarMenu'
import Logout from './components/Logout'
import useEventListener from '../../custom-hook/useEventListener'
import ArrowUp from '../ui/arrowUp'
import { useDispatch } from 'react-redux'
import { setShowSideMenuArrow } from '../../actions/users'

function SideMenu() {
  const userName = useShallowEqualSelector(getProfileName)
  const showArrow = useShallowEqualSelector(getProfileShowSideMenuArrow)
  const userRole = useShallowEqualSelector(getUserRoleText)
  const [selected, setSelected] = useState(null)
  const sideMenu = useRef()

  const dispatch = useDispatch()

  // TODO: set normal breakpoint and move it to constants
  const isDesktop = useRef(window.matchMedia('(min-width: 1025px)')).current
    .matches

  const [isOpen, setIsOpen] = useState(isDesktop)

  const setIsOpenHandler = () => {
    setIsOpen((prevState) => !prevState)
  }

  const panels = useMemo(() => {
    const result = [
      {
        panelName: 'My work',
        panelId: '...',
        smallSize: true,
        items: [
          {
            icon: clock,
            label: 'Time report',
            smallSize: true,
            pathname: '/timereport',
          },
        ],
      },
    ]
    if (userRole === 'Admin') {
      result.push(
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
        },
        {
          panelName: 'Management',
          panelId: '...',
          items: [
            {
              icon: fileCheck,
              label: 'Project management',
              pathname: '/projectmanagement',
            },
          ],
        }
      )
    } else if (userRole === 'Accountant' || userRole === 'Developer') {
      result.push({
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
      })
    } else if (userRole === 'Project manager') {
      result.push(
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
        },
        {
          panelName: 'Management',
          panelId: '...',
          items: [
            {
              icon: fileCheck,
              label: 'Project management',
              pathname: '/projectmanagement',
            },
          ],
        }
      )
    }
    return result
  }, [userRole])

  const buttonRouteTo = (item) => {
    if (item) {
      if (item === selected) {
        setSelected(null)
      } else {
        setSelected(item)
      }
    }
  }

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 200) {
      dispatch(setShowSideMenuArrow(true))
    } else {
      dispatch(setShowSideMenuArrow(false))
    }
  }, [dispatch])

  useEventListener('scroll', handleScroll, window)

  return (
    <div
      className={`${
        isOpen ? 'side_menu_container' : 'side_menu_container_close'
      }`}
    >
      <div ref={sideMenu} className="side_menu_container-wrapper">
        <div className="side_menu_wrap">
          <Logo />
          {isOpen ? <Company /> : null}
          <SideMenuButton onClick={setIsOpenHandler} />
        </div>
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
    </div>
  )
}

export default SideMenu
