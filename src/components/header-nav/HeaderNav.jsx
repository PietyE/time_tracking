import React, { memo, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getRoleUser } from 'selectors/user'
import { DEVELOPER } from 'constants/role-constant'
import ButtonHeaderNav from './components/ButtonHeaderNav'

function HeaderNav() {
  const [isOpenMenu, setStateMenu] = useState(false)

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
            to="/blog"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            BLOG
          </NavLink>
        </li>
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
            to="/timereport"
            className="nav_item_link"
            activeStyle={activeTabStale}
          >
            TIMEREPORT
          </NavLink>
        </li>
      </ul>
    </>
  )
}

const mapStateToProps = state => ({ roleUser: getRoleUser(state) })

export default memo(HeaderNav)
