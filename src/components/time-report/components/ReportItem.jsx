import React, { memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faPencilAlt,
  faEllipsisV,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

function ReportItem({ text, hours }) {
  const [isOpen, setIsOpen] = useState(false)

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handlerClickOpen = e => {
    setIsOpen(!isOpen)
  }

  const handlerOpenMenu = e => {
    e.stopPropagation()
    setIsOpenMenu(!isOpenMenu)
  }

  const classNameIsOpen = isOpen ? 'full' : 'short'
  return (
    <div className={`time_report_day_row ${classNameIsOpen}`}>
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
          <button>
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

export default memo(ReportItem)
