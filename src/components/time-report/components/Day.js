import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faPencilAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

function Day({ isRenderCreateForm, dayReport, currentData }) {
  const [isCreate, setIsCreate] = useState(isRenderCreateForm)

  const handlerAddDayReport = e => {
    e.preventDefault()
    setIsCreate(!isCreate)
  }

  const dayTitle = new Date(
    currentData.year,
    currentData.month,
    dayReport
  ).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })

  const today = new Date().getDate()
  const todayStr = today === dayReport ? '(today)' : ''

  return (
    <div className="time_report_day_container">
      <HeaderDay
        handlerAddDayReport={handlerAddDayReport}
        isCreate={isCreate}
        dayTitle={dayTitle}
        todayStr={todayStr}
      />
      {isCreate && <CreateReport />}
      <ReportRow />
      <ReportRow />
      <ReportRow />
      <FooterDay />
    </div>
  )
}

function HeaderDay({ handlerAddDayReport, isCreate, dayTitle, todayStr }) {
  return (
    <div className="time_report_day_header">
      <span className="time_report_day_title">{`${dayTitle}th ${todayStr}`}</span>
      <button className="time_report_day_addbtn" onClick={handlerAddDayReport}>
        <FontAwesomeIcon
          icon={faPlus}
          className={isCreate ? 'add_icon create_icon' : 'add_icon delete_icon'}
        />
      </button>
    </div>
  )
}

function CreateReport() {
  return (
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
  )
}

function ReportRow() {
  return (
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
  )
}

function FooterDay() {
  return (
    <div className="time_report_day_footer">
      <span>Daily Total: 6:00</span>
    </div>
  )
}

export default Day
