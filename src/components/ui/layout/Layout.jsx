import BurgerMenu from 'components/menu/burger-menu'
import SideMenu from 'components/menu/side-menu'
import useBreakpoints from 'custom-hook/useBreakpoints'
import React from 'react'

import styles from './Layout.module.scss'

export const Layout = ({ children }) => {
  const { isDesktop, isLaptop, isTablet, isMobile } = useBreakpoints()

  if (isDesktop || isLaptop) {
    return (
      <div className={styles.horizontalLayout}>
        <SideMenu isDesktop={isDesktop} />
        {children}
      </div>
    )
  }

  return (
    <div className={styles.verticalLayout}>
      <BurgerMenu />
      {children}
    </div>
  )
}
