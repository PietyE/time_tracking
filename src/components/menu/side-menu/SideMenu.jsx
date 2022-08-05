import React, { useState, useCallback, useEffect } from 'react'

import './sideMenu.scss'
import Logo from '../components/Logo'
import Company from '../components/Company'
import { SideMenuButton } from '../components/SideMenuButton'
import useEventListener from 'custom-hook/useEventListener'
import { useDispatch } from 'react-redux'
import { setShowSideMenuArrow } from 'actions/users'
import useMediaQuery from 'custom-hook/useMediaQuery'
import MenuContent from '../menu-content'

import styles from "./SideMenu.module.scss"

function SideMenu({ isDesktop }) {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(isDesktop)

  useEffect(() => {
    setIsOpen(isDesktop)
  }, [isDesktop])

  const setIsOpenHandler = () => {
    setIsOpen((prevState) => !prevState)
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
    <div className={styles.menu}>
    <div
      className={`${
        isOpen ? 'side_menu_container' : 'side_menu_container_close'
      }`}
    >
        <div className="side_menu_wrap">
          <Logo />
          {isOpen ? <Company /> : null}
          <SideMenuButton onClick={setIsOpenHandler} />
        </div>
        <MenuContent />
      </div>
    </div>
  )
}

export default SideMenu
