import React from 'react'

import './style.scss'
import {
  parseMinToHoursAndMin,
} from '../../../utils/common'
import { useSelector } from 'react-redux'
import { getSelectedProjectIdSelector } from '../../../reducers/projects-management'
import { isEqual } from 'lodash'

function ReportItemProject({ p, openEditModal, isEditModalShown }) {
  const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)

  const optEditM = (e) => {
    openEditModal(p.id)
  }

  return (
    <div
      className={
        'row report__item ' + ((p.id === currentProjectId && isEditModalShown) ? 'active' : '')
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
