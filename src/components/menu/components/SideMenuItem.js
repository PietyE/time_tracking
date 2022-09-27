import React, { useState, useMemo, useContext, useRef } from 'react'

import { SidebarContext } from 'context/sidebar-context'

import classnames from 'classnames'
// import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { Link, useRouteMatch } from 'react-router-dom'

import HintWindow from 'components/ui/HintWindow'

const SideMenuItem = (props) => {
  const [opened, setOpened] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [hide, setHide] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const sideMenuContainer = useRef()
  const sideMenuWidth = sideMenuContainer.current?.clientWidth
  const WIDTH_SIDE_MENU = 78

  const { item } = props
  const contextType = useContext(SidebarContext)

  const onClick = () => {
    // e.stopPropagation()
    contextType.onItemClick(item)
    if (!item.smallSize) {
      setOpened(!opened)
    } else {
      setOpened(opened)
    }
  }

  const isSelected = useMemo(() => {
    return item === contextType.selected
  }, [item, contextType.selected])

  const isSelectedRoute = useRouteMatch(item.pathname)

  const itemClasses = useMemo(() => {
    return classnames('sidebar_menu_button', {
      selected: isSelected || isSelectedRoute,
      smallSize: item.smallSize,
      hasChildren: !!item.subItems,
      opened,
    })
  }, [isSelected, isSelectedRoute, item.smallSize, item.subItems, opened])

  // const hideSubitem = (e) => {
  //   e.stopPropagation()
  //   e.preventDefault()
  //   setHide(!hide)
  // }

  return (
    <>
      <Link to={item.pathname} style={{ textDecoration: 'none' }}>
        <div
          className={itemClasses}
          onClick={onClick}
          ref={sideMenuContainer}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          <img src={item.icon} className="sidebar_img" alt="sidebar img" />
          {showHint && sideMenuWidth === WIDTH_SIDE_MENU && (
            <HintWindow text={item.label} />
          )}
          <span className="item">{item.label}</span>
          {/* <img src={upArrow} className={`up_arrow ${hide ? "hide" : ""}`} onClick={hideSubitem} /> */}
        </div>
      </Link>
      {item?.subItems && opened && (
        <div className={`subitem ${hide ? 'hide' : ''}`}>
          {item?.subItems.map((subItem) => (
            <SideMenuItem item={subItem} key={subItem.label} />
          ))}
        </div>
      )}
    </>
  )
}

export default SideMenuItem
