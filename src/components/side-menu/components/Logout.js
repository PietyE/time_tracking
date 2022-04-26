import React, {useRef, useState} from 'react'
import { useDispatch } from 'react-redux'

import HintWindow from 'components/ui/HintWindow'

import { logOut } from '../../../actions/users'

const Logout = (props) => {
  const { img } = props;
  const dispatch = useDispatch();

  const [showHint, setShowHint] = useState(false)

  const sideMenuContainer = useRef()
  const sideMenuWidth = sideMenuContainer.current?.clientWidth;
  const WIDTH_SIDE_MENU = 78

  const onClick = () => {
    dispatch(logOut())
  }

  return(
    <div
      className="sidebar_menu_button"
      onClick={onClick}
      ref={sideMenuContainer}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}>
      <img src={img} className="sidebar_img" alt='sidebar img'/>
      {(showHint && sideMenuWidth === WIDTH_SIDE_MENU) && <HintWindow text={'Logout'} />}
      <span className="item">Logout</span>
    </div>
  )
}

export default Logout;