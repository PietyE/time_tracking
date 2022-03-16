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
    if (
      e.target.parentNode.classList.contains('edit_dots') ||
      e.target.classList.contains('edit_dots') ||
      e.target.parentNode.classList.contains('menu') ||
      e.target.classList.contains('menu')
    ) {
      return
    } else {
      let elemm = e.target.closest('.report__item')
      setElementTop(elemm.offsetTop, '.edit-modal-container')
      openEditModal(p.id)
    }
  }

  return (
    <div
      className={
        'row report__item ' + (p.id === currentProjectId ? 'active' : '')
      }
      onClick={optEditM}
    >
      <div className="col-lg-8 report__item-container_title">
        <span className={`report__item-title ${p.is_archived ? 'disabled' : ''}`}>{p.name}</span>
      </div>
      <div className="col-lg-3">
        <span className={`hours-worked ${p.is_archived ? 'disabled' : ''}`}>
          {parseMinToHoursAndMin(p.total_minutes, true)}
        </span>
      </div>
      {/* <div className="col-lg-2">
        <div className="row justify-content-end">
          <div className={'edit_dots '} onClick={toggleEdit}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              color="#414141"
              className="icon pencil_icon"
            />
          </div>
          {isEdit && (
            <div className={'menu'}>
              <button className="button" type={'button'} form="edit_form">
                <img src={Archive} alt="" className={'archive'} />
                Archive
              </button>
              <button className="button delete_button">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="icon trash_icon"
                />
                Delete
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default ReportItemProject
