import React, { useState, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function CreateReportForm({ addTimeReport, numberOfDay, selectedDate }) {
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

export default memo(CreateReportForm)
