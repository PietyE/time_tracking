import React, { useState, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import InputMask from 'react-input-mask'

function CreateReportForm({
  addTimeReport,
  numberOfDay,
  selectedDate,
  handlerEndAnimation,
  extraClassName,
}) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState('')

  const handlerClickAddButton = () => {
    if (!text && !hours) return
    const [_hour, min] = hours.split(':')
    const takeTime = _hour ? +_hour * 60 + +min : +min

    addTimeReport({
      date: `${selectedDate.year}-${selectedDate.month + 1}-${numberOfDay}`,
      description: text,
      tookHours: takeTime,
    })
    setText('')
    setHours('')
  }

  const handlerChangeText = e => {
    setText(e.target.value)
  }

  const handlerChangeHours = e => {
    const value = e.target.value
    setHours(value)
  }

  return (
    <div
      className={`time_report_day_row_create ${extraClassName}`}
      onAnimationEnd={handlerEndAnimation}
    >
      <input
        type="text"
        name="description"
        placeholder="What did you work on?"
        className="description_input input"
        value={text}
        onChange={handlerChangeText}
      />
      <InputMask
        placeholder="HH"
        maskPlaceholder="0"
        className="hours_input input"
        value={hours}
        onChange={handlerChangeHours}
        mask="99:99"
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
