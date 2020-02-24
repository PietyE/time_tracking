import React, { memo, useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faPencilAlt,
  faEllipsisV,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import Modal from 'components/ui/modal'
import { deleteTimeReport } from 'actions/timereports'
import { parseMinToHoursAndMin } from 'utils/common'

function ReportItem({ text, hours, deleteTimeReport, id, editingItemRow }) {
  const [isOpenLongText, setIsOpenLongText] = useState(false)
  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [isEditingText, setIsEditingText] = useState(false)

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handlerClickOpenLongText = e => {
    setIsOpenLongText(!isOpenLongText)
  }

  const handlerOpenMenu = e => {
    e.stopPropagation()
    setIsOpenMenu(!isOpenMenu)
    if (isOpenMenu) {
      setIsEditingText(false)
    }
  }

  const handlerClickDelete = e => {
    e.stopPropagation()
    setIsDeleteRequest(!isDeleteRequest)
  }

  const handlerClickEdit = e => {
    setIsOpenLongText(true)
    editingItemRow(text, hours)
    setIsEditingText(true)
  }

  const classNameIsOpen = isOpenLongText ? 'full' : 'short'
  const activeClassNameContainerForDeletting = isDeleteRequest ? 'active' : ''
  const activeClassNameContainerForEditting = isEditingText ? 'editing' : ''

  return (
    <div
      className={`time_report_day_row ${classNameIsOpen} ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting}`}
    >
      {isDeleteRequest && (
        <Modal
          title={'Are you sure that you want to delete this report?'}
          onClickClose={handlerClickDelete}
          onClickYes={deleteTimeReport}
          id={id}
        />
      )}
      <span
        className="time_report_day_description"
        onClick={handlerClickOpenLongText}
        contentEditable={isEditingText}
      >
        {<a href={text}>{text}</a>}
      </span>
      <span className="time_report_day_hours">
        {parseMinToHoursAndMin(hours)}
      </span>
      <div className="time_report_day_edit">
        <button onClick={handlerOpenMenu}>
          <FontAwesomeIcon
            icon={faEllipsisV}
            color="#414141"
            className="icon times_icon"
          />
        </button>
        <div
          className={
            isOpenMenu ? 'time_report_day_menu open' : 'time_report_day_menu'
          }
        >
          <button>
            <FontAwesomeIcon
              onClick={handlerClickEdit}
              icon={faPencilAlt}
              className="icon pencil_icon"
            />
          </button>
          <button onClick={handlerClickDelete}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon pencil_icon" />
          </button>
          <button onClick={handlerOpenMenu}>
            <FontAwesomeIcon icon={faTimes} className="icon times_icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

const actions = {
  deleteTimeReport,
}

export default memo(connect(null, actions)(ReportItem))
