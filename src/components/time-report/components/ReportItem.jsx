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

function ReportItem({ text, hours, deleteTimeReport, id }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteRequest, setIsDeleteRequest] = useState(false)

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handlerClickOpen = e => {
    setIsOpen(!isOpen)
  }

  const handlerOpenMenu = e => {
    e.stopPropagation()
    setIsOpenMenu(!isOpenMenu)
  }

  const handlerClickDelete = e => {
    e.stopPropagation()
    setIsDeleteRequest(!isDeleteRequest)
  }

  const classNameIsOpen = isOpen ? 'full' : 'short'

  return (
    <div className={`time_report_day_row ${classNameIsOpen}`}>
      {isDeleteRequest && (
        <Modal
          title={'Are you sure that you want to delete this report?'}
          onClickClose={handlerClickDelete}
          onClickYes={deleteTimeReport}
          id={id}
        />
      )}
      <span className="time_report_day_description" onClick={handlerClickOpen}>
        {text}
      </span>
      <span className="time_report_day_hours">{`${hours}:00`}</span>
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
              icon={faPencilAlt}
              color="#414141"
              className="icon pencil_icon"
            />
          </button>
          <button onClick={handlerClickDelete}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="#414141"
              className="icon pencil_icon"
            />
          </button>
          <button onClick={handlerOpenMenu}>
            <FontAwesomeIcon
              icon={faTimes}
              color="#414141"
              className="icon times_icon"
            />
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
