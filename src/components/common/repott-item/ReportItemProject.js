import React, { useEffect, useState } from 'react'

import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import Archive from '../../../images/archive1.svg'
import {
  closeEditMenu,
  parseMinToHoursAndMin,
  setElementTop,
} from '../../../utils/common'
import { useSelector } from 'react-redux'
import { getSelectedProjectIdSelector } from '../../../reducers/projects-management'
import { isEqual } from 'lodash'

function ReportItemProject({ p, openEditModal }) {
  let [isEdit, setIsEdit] = useState(false)
  const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)

  let toggleEdit = () => {
    setIsEdit(!isEdit)
  }

  useEffect(() => {
    closeEditMenu(isEdit, setIsEdit)
  }, [isEdit])

  const optEditM = (e) => {
    openEditModal(p.id)
  }

  return (
    <div
      className={
        'row report__item ' + (p.id === currentProjectId ? 'active' : '')
      }
      onClick={optEditM}
    >
      <div className="col-8 report__item-container_title">
        <span className={`report__item-title ${p.is_archived ? 'disabled_archived' : ''}`}>{p.name}</span>
      </div>
      <div className="col-3">
        <span className={`hours-worked ${p.is_archived ? 'disabled_archived' : ''}`}>
          {parseMinToHoursAndMin(p.total_minutes, true)}
        </span>
      </div>
    </div>
  )
}

export default ReportItemProject
