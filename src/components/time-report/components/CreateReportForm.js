import React, { useState, useEffect, memo } from 'react'
import { connect, useSelector } from 'react-redux'
import { isEqual } from 'lodash'
import { setEditMode } from 'actions/times-report'
import { showAlert } from '../../../actions/alert'
import { DANGER_ALERT, WARNING_ALERT } from '../../../constants/alert-constant'
import { error } from '../../../reducers/error'
import ReportItemForm from './ReportItemForm'
import { getSelectedDate } from 'selectors/calendar'

function CreateReportForm({
  addTimeReport,
  numberOfDay,
  selectedDate,
  setEditMode,
  showAlert,
  sumHours,
  handleFormFocus,
  handleFormBlur,
}) {
  const [text, setText] = useState('')
  const [hours, setHours] = useState('')
  const [isTextInputError, setIsTextInputError] = useState(false)
  const [isTimeInputError, setIsTimeInputError] = useState(false)

  const selectedDay = useSelector(getSelectedDate, isEqual)
  useEffect(() => {
    setIsTextInputError(false)
    setIsTimeInputError(false)
  }, [selectedDay])

  const MAX_SIZE = 1000

  const handlerClickAddButton = (e) => {
    e.preventDefault()
    const [_hour, min] = hours.split(':')
    const takeTime = _hour ? +_hour * 60 + +min : +min

    if (!text && !hours) {
      setIsTextInputError(true)
      setIsTimeInputError(true)
      showAlert({
        type: DANGER_ALERT,
        title: 'Fields can not be empty',
        message: error.message || 'Fields can not be empty',
        delay: 5000,
      })
      return
    }
    if (!text) {
      setIsTextInputError(true)
      showAlert({
        type: DANGER_ALERT,
        title: 'Task name can not be empty',
        message: error.message || 'Task name can not be empty',
        delay: 5000,
      })
      return
    }
    if (!hours || hours === '0:00') {
      setIsTimeInputError(true)
      showAlert({
        type: DANGER_ALERT,
        title: 'Field of time can not be empty',
        message: error.message || 'Field of time can not be empty',
        delay: 5000,
      })
      return
    }
    if (sumHours + takeTime > 1440) {
      setIsTimeInputError(true)
      showAlert({
        type: DANGER_ALERT,
        title: 'Time limit exceeded',
        message: error.message || 'You can not log more than 24 hours per day',
        delay: 5000,
      })
      return
    }
    if (takeTime % 15 !== 0) {
      setIsTimeInputError(true)
      showAlert({
        type: WARNING_ALERT,
        title: 'Check the entered value',
        message: error.message || 'The value must be a multiple of 15',
        delay: 5000,
      })
      return
    }

    if (takeTime > 480) {
      setIsTimeInputError(true)
      showAlert({
        type: WARNING_ALERT,
        title: 'Check the entered value',
        message:
          error.message || 'Maximum working time is 8 hours for one work item',
        delay: 5000,
      })
      return
    }

    setIsTextInputError(false)

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
      setIsTextInputError(false)
    }
    setText(e.target.value)
    const size = e.target.value.split('').length
  }

  const handlerChangeHours = (e) => {
    const value = e.target.value
    if (value) {
      setIsTimeInputError(false)
    }
    setHours(value)
  }

  const handlerFocus = () => {
    setEditMode(null)
  }
  return (
    <ReportItemForm
      textInputValue={text}
      textInputPlaceholder="What did you work on?"
      handleTextInputChange={handlerChangeText}
      textInputError={isTextInputError}
      timeInputValue={hours}
      handleTimeInputChange={handlerChangeHours}
      handleTimeInputFocus={handlerFocus}
      timeInputError={isTimeInputError}
      isSubmitButtonDisabled={!(hours && hours !== '0:00' && text)}
      handleFormSubmit={handlerClickAddButton}
    />
  )
}

const actions = {
  setEditMode,
  showAlert,
}

export default connect(null, actions)(memo(CreateReportForm))
