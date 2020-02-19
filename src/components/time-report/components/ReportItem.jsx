import React, { memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function ReportItem({ text, hours }) {
  const [isOpen, setIsOpen] = useState(false)
  const handlerClickOpen = e => {
    setIsOpen(!isOpen)
  }
  const classNameIsOpen = isOpen ? 'full' : 'short'
  return (
    <div
      className={`time_report_day_row ${classNameIsOpen}`}
      onClick={handlerClickOpen}
    >
      <span className="time_report_day_description">{text}</span>
      <div className="time_report_day_edit">
        <span className="time_report_day_hours">{`${hours}:00`}</span>
        <FontAwesomeIcon
          icon={faPencilAlt}
          color="#414141"
          className="icon pencil_icon"
        />
        <FontAwesomeIcon
          icon={faTimes}
          color="#414141"
          className="icon times_icon"
        />
      </div>
    </div>
  )
}

export default memo(ReportItem)
