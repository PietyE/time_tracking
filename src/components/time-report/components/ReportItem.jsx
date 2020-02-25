import React, { memo, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faPencilAlt,
  faEllipsisV,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { deleteTimeReport, editTimeReport } from 'actions/timereports'
import { parseMinToHoursAndMin } from 'utils/common'
import DeleteModal from './DeleteModal'
import EditingModal from './EditingModal'

function ReportItem({ text, hours, deleteTimeReport, id, editTimeReport }) {
  const reportItemContainerRef = useRef()
  const [isOpenLongText, setIsOpenLongText] = useState(false)
  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [isEditingText, setIsEditingText] = useState(false)
  const [modalCoords, setModalCoords] = useState({})

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handlerClickOpenLongText = e => {
    setIsOpenLongText(!isOpenLongText)
  }

  const handlerOpenMenu = e => {
    e.stopPropagation()
    setIsOpenMenu(!isOpenMenu)
  }

  const handlerClickOpenDeleteModal = e => {
    e.stopPropagation()
    setIsDeleteRequest(!isDeleteRequest)
  }

  const handlerClickDelete = e => {
    deleteTimeReport(id)
    setIsDeleteRequest(false)
  }

  const handlerClickOpenEditModal = e => {
    setIsEditingText(!isEditingText)
    setModalCoords(reportItemContainerRef.current.getBoundingClientRect())
    setIsOpenMenu(false)
  }

  const classNameIsOpen = isOpenLongText ? 'full' : 'short'
  const activeClassNameContainerForDeletting = isDeleteRequest ? 'active' : ''
  const activeClassNameContainerForEditting = isEditingText ? 'editing' : ''

  return (
    <div
      ref={reportItemContainerRef}
      className={`time_report_day_row ${classNameIsOpen} ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting}`}
    >
      {isEditingText && (
        <EditingModal
          id={id}
          handlerClickOpenEditModal={handlerClickOpenEditModal}
          modalCoords={modalCoords}
          editTimeReport={editTimeReport}
        />
      )}
      {isDeleteRequest && (
        <DeleteModal
          handlerClickOpenDeleteModal={handlerClickOpenDeleteModal}
          handlerClickDelete={handlerClickDelete}
        />
      )}
      <span
        className="time_report_day_description"
        onClick={handlerClickOpenLongText}
      >
        {text}
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
          <button onClick={handlerClickOpenEditModal}>
            <FontAwesomeIcon icon={faPencilAlt} className="icon pencil_icon" />
          </button>
          <button onClick={handlerClickOpenDeleteModal}>
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
  editTimeReport,
}

export default memo(connect(null, actions)(ReportItem))
