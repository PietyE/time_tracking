import React, { useState, memo, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faPencilAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

function Day({
  isRenderCreateForm,
  numberOfDay,
  selectedDate,
  descriptions,
  addTimeReport,
}) {
  const today = new Date()
  const isOpenCreate =
    today.getDate() === numberOfDay &&
    today.getMonth() === selectedDate.month &&
    today.getFullYear() === selectedDate.year

  const [isCreate, setIsCreate] = useState(false)

  const handlerAddDayReport = e => {
    e.preventDefault()
    setIsCreate(!isCreate)
  }

  const dayTitle = new Date(
    selectedDate.year,
    selectedDate.month,
    numberOfDay
  ).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })

  const todayStr = isOpenCreate ? '(today)' : ''

  const sumHours = descriptions.reduce(
    (sum, item) => (sum = sum + item.duration / 60),
    0
  )

  console.log('render day')

  return (
    <div className="time_report_day_container">
      <HeaderDay
        handlerAddDayReport={handlerAddDayReport}
        isCreate={isCreate}
        dayTitle={dayTitle}
        todayStr={todayStr}
      />
      {(isOpenCreate || isCreate) && (
        <CreateReport
          addTimeReport={addTimeReport}
          numberOfDay={numberOfDay}
          selectedDate={selectedDate}
        />
      )}
      {descriptions.map(({ text, duration, id }) => (
        <ReportRow key={id} text={text} hours={duration / 60} />
      ))}
      <FooterDay sumHours={sumHours} />
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

function CreateReport({ addTimeReport, numberOfDay, selectedDate }) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState('')
  const handlerClickAddButton = () => {
    if (!text && !hours) return

    addTimeReport({
      date: Date.parse(
        `${selectedDate.year}-${selectedDate.month + 1}-${numberOfDay}`
      ),
      description: text,
      tookHours: +hours,
    })
    setText('')
    setHours('')
  }
  const handlerChangeText = e => {
    setText(e.target.value)
  }
  const handlerChangeHours = e => {
    if (isNaN(+e.target.value)) return
    setHours(e.target.value.trim())
  }

  return (
    <div className={`time_report_day_row_create`}>
      <input
        type="text"
        name="description"
        placeholder="What did you work on?"
        className="description_input input"
        value={text}
        onChange={handlerChangeText}
      />
      <input
        type="text"
        name="hours"
        placeholder="HH"
        className="hours_input input"
        value={hours}
        onChange={handlerChangeHours}
        maxLength={2}
      />
      <button className="create_btn" onClick={handlerClickAddButton}>
        <FontAwesomeIcon
          icon={faCheck}
          color="#414141"
          className="icon pencil_icon"
        />
      </button>
    </div>
  )
}

function ReportRow({ text, hours }) {
  return (
    <div className="time_report_day_row">
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

function FooterDay({ sumHours = '00' }) {
  return (
    <div className="time_report_day_footer">
      <span>{`Daily Total: ${sumHours}:00`}</span>
    </div>
  )
}

// function areEqual(prevProps, nextProps) {
//   if (
//     JSON.stringify(prevProps.descriptions) ===
//     JSON.stringify(nextProps.descriptions)
//   ) {
//     // console.log('prevProps', prevProps.descriptions)
//     // console.log('nextProps', nextProps.descriptions)
//     // console.log('numberOfDay', prevProps.numberOfDay)
//     return true
//   }

//   return false
// }

export default memo(Day)
