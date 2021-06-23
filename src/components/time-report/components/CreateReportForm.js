import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import InputMask from 'react-input-mask'

import { setEditMode } from 'actions/times-report'
import { showAler } from '../../../actions/alert'
import { DANGER_ALERT, WARNING_ALERT } from '../../../constants/alert-constant'
import { error } from '../../../reducers/error'

function CreateReportForm({
  addTimeReport,
  numberOfDay,
  selectedDate,
  handlerEndAnimation,
  extraClassName,
  setEditMode,
  showAler,
  sumHours,
}) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState('')
  const [leftSize, setLeftSize] = useState(1000)
  const [borderInputClassName, setBorderInputClassName] = useState('')
  const [borderInputHoursClassName, setBorderInputHoursClassName] = useState('')

  const MAX_SIZE = 1000

  const handlerClickAddButton = () => {
    const [_hour, min] = hours.split(':')
    const takeTime = _hour ? +_hour * 60 + +min : +min
    if (!text && !hours) {
      setBorderInputClassName('border-danger')
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        title: 'Fields can not be empty',
        message: error.message || 'Fields can not be empty',
        delay: 5000,
      })
      return
    }
    if (!text) {
      setBorderInputClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        title: 'Task name can not be empty',
        message: error.message || 'Task name can not be empty',
        delay: 5000,
      })
      return
    }
    if (!hours || hours === '0:00') {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        title: 'Field of time can not be empty',
        message: error.message || 'Field of time can not be empty',
        delay: 5000,
      })
      return
    }
    if (sumHours + takeTime > 1440) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        title: 'Time limit exceeded',
        message: error.message || 'You can not log more than 24 hours per day',
        delay: 5000,
      })
      return
    }

    setBorderInputClassName('')

    addTimeReport({
      date: `${selectedDate.year}-${selectedDate.month + 1}-${numberOfDay}`,
      description: text,
      tookHours: takeTime,
    })
    setText('')
    setHours('')
  }

  const handlerChangeText = (e) => {
    if (e.target.value) {
      setBorderInputClassName('')
    }
    setText(e.target.value)
    const size = e.target.value.split('').length
    setLeftSize(MAX_SIZE - size)
  }

  const handlerChangeHours = (e) => {
    const value = e.target.value
    if (value) {
      setBorderInputHoursClassName('')
    }
    setHours(value)
  }

  const handlerFocus = () => {
    setEditMode(null)
  }
  return (
    <div
      className={`time_report_day_row_create ${extraClassName}`}
      onAnimationEnd={handlerEndAnimation}
    >
      <div className="description_input_container">
        <input
          type="text"
          name="description"
          placeholder="What did you work on?"
          className={`description_input input ${borderInputClassName}`}
          value={text}
          onChange={handlerChangeText}
          onFocus={handlerFocus}
          maxLength={1000}
        />
        {leftSize < 50 && <span className="left_size">{leftSize}</span>}
      </div>

      <div className="time_report_day_row_create_right">
        <InputMask
          placeholder="HH"
          maskPlaceholder="0"
          className={`hours_input input ${borderInputHoursClassName}`}
          value={hours}
          onChange={handlerChangeHours}
          mask="9:99"
          onFocus={handlerFocus}
        />
        <button className="create_btn" onClick={handlerClickAddButton}>
          <FontAwesomeIcon
            icon={faCheck}
            color="#414141"
            className="icon pencil_icon"
          />
        </button>
      </div>
    </div>
  )
}

const actions = {
  setEditMode,
  showAler,
}

export default connect(null, actions)(memo(CreateReportForm))
