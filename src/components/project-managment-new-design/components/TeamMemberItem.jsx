import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { changeUserOnProject } from 'actions/projects-management'
import { useDispatch } from 'react-redux'

const TeamMemberItem = ({ data, setFieldValue, values, type }) => {
  const dispatch = useDispatch()

  const occupancyToBool = !!data?.is_full_time

  const [occupancy, setOccupancy] = useState(!occupancyToBool)

  const _changeUserOnProject = useCallback(
    (id, data) => {
      dispatch(changeUserOnProject({ id, data }))
    },
    [dispatch]
  )

  const removeMember = (e) => {
    setFieldValue(
      'team',
      values.team.filter((el) => el.name !== e.target.dataset.name)
    )
    if (type === 'update') {
      _changeUserOnProject(e.target.dataset.id, { is_active: false })
    }
  }

  const changeOccupancy = (e) => {
    setOccupancy(!occupancy)
    let index = values.team.findIndex((el) => el.user_id === data.user_id)
    data.is_full_time = occupancy
    const newArr = [...values.team]
    newArr.splice(index, 1, data)
    setFieldValue('team', newArr)
    if (type === 'update') {
      _changeUserOnProject(e.target.dataset.id, {
        is_full_time: data.is_full_time,
      })
    }
  }

  return (
    <li data-name={data.name} className="pm_create_team_item">
      <span className="pm_create_team_text">{data.name}</span>
      <div className="pm_create_team_control_container">
        <label className="pm_create_team_checkbox_label">
          <input
            type="checkbox"
            checked={occupancy}
            data-id={data.projectReportId}
            onChange={changeOccupancy}
            className="pm_create_team_checkbox"
          />
          Hourly
        </label>

        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={removeMember}
          data-name={data.name}
          data-id={data.projectReportId}
          className="pm_create_team_close"
        />
      </div>
    </li>
  )
}

export default TeamMemberItem
