import React, { useState, useEffect, memo, useCallback } from 'react'
import { connect, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import InputMask from 'react-input-mask'
import {isEqual} from 'lodash'
import {getSelectedDateTimeReport} from '../../../selectors/timereports'
import {setEditMode, setUserStatus} from 'actions/times-report'
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
  // savePosition,
  // selectDayStatus,
  // selectedDayStatus
}) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState('')
  const [leftSize, setLeftSize] = useState(1000)
  const [borderInputClassName, setBorderInputClassName] = useState('')
  const [borderInputHoursClassName, setBorderInputHoursClassName] = useState('')

  const selectedDay = useSelector(getSelectedDateTimeReport, isEqual)
  useEffect(()=>{
    setBorderInputClassName('')
    setBorderInputHoursClassName('')
  },[selectedDay])

  const MAX_SIZE = 1000

  const handlerClickAddButton = (e) => {
    e.preventDefault()
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
    if ((takeTime % 15) !== 0) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: WARNING_ALERT,
        title: 'Check the entered value',
        message: error.message || 'The value must be a multiple of 15',
        delay: 5000,
      })
      return
    }
   
    if (takeTime > 480) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: WARNING_ALERT,
        title: 'Check the entered value',
        message: error.message || 'Maximum working time is 8 hours for one work item',
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
    // savePosition(e)
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
    <form
      onSubmit={handlerClickAddButton}
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
          placeholder="0:00"
          maskPlaceholder="0"
          className={`hours_input input ${borderInputHoursClassName}`}
          value={hours}
          onChange={handlerChangeHours}
          mask="9:99"
          onFocus={handlerFocus}
        />
        <button className={'create_btn '+(hours && hours!=='0:00' && text ? '': 'disabled')} onClick={handlerClickAddButton}>
          <FontAwesomeIcon
            icon={faCheck}
            color="#414141"
            className="icon pencil_icon"
          />
        </button>
      </div>
    </form>
  )
}

const actions = {
  setEditMode,
  showAler,
}

export default connect(null, actions)(memo(CreateReportForm))
