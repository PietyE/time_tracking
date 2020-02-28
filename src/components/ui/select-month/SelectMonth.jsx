import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import { faCalendar } from '@fortawesome/free-regular-svg-icons'

import { monthsNamesLong, monthsNamesShort } from 'constants/months'

import './style.scss'

function SelectMonth({
  selectedDate = {},
  setNewData,
  extraClassNameContainer,
}) {
  const todayDate = new Date()
  const year = todayDate.getFullYear()
  const month = todayDate.getMonth()

  const selectMonthRef = useRef()

  const [currentMonth, setCurrentMonth] = useState(selectedDate.month || month)

  const [currentYear, setCurrentYear] = useState(selectedDate.year || year)

  const [isOpenPicker, setIsOpenPicker] = useState(false)

  const handlerSelectMonth = e => {
    e.preventDefault()
    const selectedMonth = +e.target.dataset.month
    if (e.target.classList.contains('disabled')) return
    setNewData({ month: selectedMonth, year: currentYear })
    setCurrentMonth(selectedMonth)
    setIsOpenPicker(false)
  }

  const handlerSelectPrevYear = e => {
    e.preventDefault()
    setCurrentYear(currentYear - 1)
  }

  const handlerSelectNextYear = e => {
    e.preventDefault()
    setCurrentYear(currentYear + 1)
  }

  const handlerSelectPrevMonth = e => {
    e.preventDefault()
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setNewData({ month: 11, year: currentYear - 1 })
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
      setNewData({ month: currentMonth - 1, year: currentYear })
    }
  }

  const handlerSelectNextMonth = e => {
    e.preventDefault()
    e.stopPropagation()
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setNewData({ month: 0, year: currentYear + 1 })
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
      setNewData({ month: currentMonth + 1, year: currentYear })
    }
  }

  const handlerOpenPicker = () => {
    setIsOpenPicker(!isOpenPicker)
  }

  const longMonthName = monthsNamesLong[currentMonth]

  const longMonthNameText =
    selectedDate.year && selectedDate.year !== year
      ? `${longMonthName}, ${selectedDate.year}`
      : longMonthName

  const dissabledNextYearButton = currentYear === year
  const disabledNextMonthButton =
    selectedDate.month === month && dissabledNextYearButton

  const getClassNameForMonth = index => {
    let className = 'day_button'
    if (index > month && dissabledNextYearButton) {
      className = className + ' disabled'
    }
    if (selectedDate.month === index && currentYear === selectedDate.year) {
      className = className + ' active'
    }
    return className
  }

  const checkIsParentNode = useCallback((parent, child) => {
    let res = false
    if (!child) {
      return res
    }
    if (
      child.parentElement &&
      child.parentElement.classList.contains('select_month_container') ===
        parent.classList.contains('select_month_container')
    ) {
      res = true
    } else {
      res = checkIsParentNode(parent, child.parentElement)
    }
    return res
  }, [])

  const callbackEventListener = useCallback(
    event => {
      const isParent = checkIsParentNode(selectMonthRef.current, event.target)
      if (isParent) return
      setIsOpenPicker(false)
      document.removeEventListener('click', callbackEventListener)
    },
    [checkIsParentNode]
  )

  useEffect(() => {
    if (isOpenPicker) {
      document.addEventListener('click', callbackEventListener)
    }
    return () => {
      document.removeEventListener('click', callbackEventListener)
    }
  }, [callbackEventListener, isOpenPicker])

  return (
    <div
      className={`select_month_container ${
        isOpenPicker ? 'open' : ''
      } ${extraClassNameContainer}`}
      ref={selectMonthRef}
    >
      <button
        className="select_btn prev_month"
        onClick={handlerSelectPrevMonth}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="icon_change_month_button"
        />
      </button>
      <div className="data_title_container" onClick={handlerOpenPicker}>
        <FontAwesomeIcon icon={faCalendar} className="calendar_icon" />
        <span className="data_title">{longMonthNameText}</span>
      </div>
      <button
        className={
          disabledNextMonthButton
            ? 'select_btn next_month disabled'
            : 'select_btn next_month'
        }
        onClick={disabledNextMonthButton ? null : handlerSelectNextMonth}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="icon_change_month_button"
        />
      </button>
      {isOpenPicker && (
        <div className="select_month_wrap">
          <div className="select_year">
            <button
              className="button button_left"
              onClick={handlerSelectPrevYear}
            >
              <FontAwesomeIcon icon={faCaretLeft} className="icon_button" />
            </button>
            <span className="current_year">{currentYear}</span>
            <button
              className={
                dissabledNextYearButton
                  ? 'button button_right disabled'
                  : 'button button_right'
              }
              onClick={dissabledNextYearButton ? null : handlerSelectNextYear}
            >
              <FontAwesomeIcon icon={faCaretRight} className="icon_button" />
            </button>
          </div>
          <div className="month_list_container">
            {monthsNamesShort.map((item, index) => (
              <button
                key={item}
                className={getClassNameForMonth(index)}
                data-month={index}
                onClick={handlerSelectMonth}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectMonth
