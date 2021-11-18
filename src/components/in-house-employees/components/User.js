import React, { useState } from 'react'

import clock from 'images/sideMenuIcons/clock.svg'

import { selectProjectsByUserId } from 'selectors/project-report-details';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';


function User (props) {
  const {
    name,
    email,
    id
  } = props;

  const userProjects = useShallowEqualSelector((state) => selectProjectsByUserId(state, id))
  console.log(userProjects)

  return (
    <div className="user_info">
      <img src={clock} alt="avatar" className="user_avatar" />
      <div className="name_email">
        <span className="name">{name}</span>
        <span className="email">{email}</span>
      </div>
      <div className="projects">

      </div>
      
    </div>
  )
}
export default User;