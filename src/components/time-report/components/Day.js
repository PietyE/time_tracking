import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faPencilAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

function Day() {
  return (
    <div className="time_report_day_container">
      <div className="time_report_day_header">
        <span className="time_report_day_title">Friday, May 31st (today)</span>
        <span className="time_report_day_addbtn">
          <FontAwesomeIcon icon={faPlus} color="#d5d5d5" />
        </span>
      </div>
      <div className="time_report_day_row_create">
        <input
          type="text"
          name="description"
          placeholder="What did you work on?"
          className="description_input input"
        />
        <input
          type="text"
          name="hours"
          placeholder="HH"
          className="hours_input input"
        />
        <button className="create_btn">
          <FontAwesomeIcon
            icon={faCheck}
            color="#414141"
            className="icon pencil_icon"
          />
        </button>
      </div>
      <div className="time_report_day_row">
        <span className="time_report_day_description">
          Add new different states of logged in users and made changes in
          Statistics screen f logged in users and made changes
        </span>
        <div className="time_report_day_edit">
          <span className="time_report_day_hours">16:00</span>
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
      <div className="time_report_day_footer">
        <span>Daily Total: 6:00</span>
      </div>
    </div>
  )
}

export default Day
