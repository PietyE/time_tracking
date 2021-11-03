import React, { useState, useMemo, useContext } from 'react'

import {SidebarContext} from 'context/sidebar-context'

import classnames from 'classnames'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

const SideMenuItem = (props) =>{
  const [opened, setOpened] = useState(true);

  const { item } = props;
  const contextType = useContext(SidebarContext);
  
  const onClick = (e) => {
    e.stopPropagation()
    contextType.onItemClick(item)
    if(!item.smallSize){
    setOpened(!opened)
    } else {
      setOpened(opened)
    }
  }

  const isSelected = useMemo(() => {
    return (
      item === contextType.selected
    )
  }, [item, contextType.selected])

  const itemClasses = useMemo(() => {
    return (
      classnames("sidebar_menu_button",
      {
        selected: isSelected,
        smallSize: item.smallSize,
        hasChildren: !!item.subItems,
        opened
      })
    )
  }, [isSelected])

  return (
    <>
      <div className={itemClasses} onClick={onClick}>
        <img src={item.icon} className="sidebar_img" />
        <span className="item">{item.label}</span>
        <img src={upArrow} className="up_arrow" />
      </div>
      {item?.subItems &&
       opened && (
        <div className="subitem">
          {item?.subItems.map((subItem) => (
            <SideMenuItem item={subItem} key={subItem.label} />
          ))}
        </div>
      )}
    </>
  );
}

export default SideMenuItem;