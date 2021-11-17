import React from 'react'
import { useDispatch } from 'react-redux'

import { logOut } from '../../../actions/users'

const Logout = (props) => {
  const { img } = props;
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logOut())
  }

  return(
    <div className="sidebar_menu_button" onClick={onClick}>
      <img src={img} className="sidebar_img"/>
      <span className="item">Logout</span>
    </div>
  )
}

export default Logout;