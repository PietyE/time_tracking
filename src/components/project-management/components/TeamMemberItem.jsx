import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

const TeamMemberItem = ({data, setFieldValue, values}) => {
const [occupancy, setOccupancy] = useState(!data.fullTime)
  const removeMember = (e) => {
    setFieldValue(
      'team',
      values.team.filter((el) => el.name !== e.target.dataset.name)
    )
  }
  const changeOccupancy = () =>{
    setOccupancy(!occupancy)
    let index = values.team.findIndex(el => el.id === data.id);
    data.fullTime = occupancy
    const newArr = [...values.team]
    newArr[index] = data
    setFieldValue('team', newArr)
  }
  return (
    <li onClick={removeMember} data-name={data.name} className='pm_create_team_item' >
      <span className='pm_create_team_text'>{data.name}</span>
      <div className='pm_create_team_control_container'>
        <label className='pm_create_team_checkbox_label'>
          <input onChange={changeOccupancy}  checked={occupancy} type='checkbox' className='pm_create_team_checkbox'/>
          Part-time
        </label>

        <FontAwesomeIcon icon={faTimesCircle} onClick={removeMember} data-name={data.name}  className='pm_create_team_close'/>
      </div>

    </li>
  )
}

export default TeamMemberItem