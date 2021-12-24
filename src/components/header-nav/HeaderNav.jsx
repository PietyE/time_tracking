import React, { memo, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import ButtonHeaderNav from './components/ButtonHeaderNav'
import { getRoleUser } from 'selectors/user'

function HeaderNav() {
  const [isOpenMenu, setStateMenu] = useState(false)
  const [permission, setPermission] = useState(false)

  const userRole = useSelector(getRoleUser, shallowEqual)
  
  useEffect(() => {
    if([1,2].includes(userRole)){
      setPermission(false)
    } else {
      setPermission(true)
    }
  }, [])

  const activeTabStale = {
    color: '#249c98',
  }

  const handlerOpenMenu = () => {
    setStateMenu(!isOpenMenu)
  }

  const callbackEventListener = useCallback(() => {
    setStateMenu(false)
    document.removeEventListener('click', callbackEventListener)
  }, [])

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener('click', callbackEventListener)
    }
  }, [isOpenMenu, callbackEventListener])

  useEffect(() => {
    const _clear = () => {
      document.removeEventListener('click', callbackEventListener)
    }
    return () => {
      _clear()
    }
  }, [callbackEventListener])

  const classWhenOpenMenu = isOpenMenu ? 'open_menu' : ''

  return (
    <>
      <ButtonHeaderNav
        handlerOpenMenu={handlerOpenMenu}
        classWhenOpenMenu={classWhenOpenMenu}
      />
      <ul className={`nav_section_container ${classWhenOpenMenu}`}>
        <li className="nav_item">
          <NavLink
            to="/projects"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            PROJECTS REPORT
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink
            to={'/timereport'}
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            TIMEREPORT
          </NavLink>
        </li>
        {permission &&
        <li className="nav_item">
          <NavLink
            to="/management"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            PROJECTS MANAGEMENT
          </NavLink>
        </li>
        }
      </ul>
    </>
  )
}

export default memo(HeaderNav)
