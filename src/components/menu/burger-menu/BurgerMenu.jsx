import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Logo from 'components/ui/logo'
import React, { useState } from 'react'
import MenuContent from '../menu-content'
import styles from './BurgerMenu.module.scss'

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    if (open) {
      setIsOpen(open)
      return
    }

    setIsOpen((prevOpenValue) => !prevOpenValue)
  }

  const dropdownMenu = () => (
    <div
      role="presentation"
      className={styles.dropdownMenu}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={styles.appBarGutter} />
      <MenuContent />
    </div>
  )

  return (
    <div className={styles.menu}>
      <div className={styles.appBarGutter} />
      <AppBar className={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Box className={styles.appBar_content}>
            <Typography className={styles.title} variant="h2">
              Vilmates
            </Typography>
            <Logo size="small" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        ModalProps={{ disablePortal: true }}
        open={isOpen}
        anchor="top"
        onClose={toggleDrawer(false)}
        className={styles.drawer}
      >
        {dropdownMenu()}
      </Drawer>
    </div>
  )
}
