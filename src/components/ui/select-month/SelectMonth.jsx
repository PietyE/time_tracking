import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { monthsNamesLong, monthsNamesShort } from 'constants/months'

import styles from './SelectMonth.module.scss'

export const SelectMonth = ({
  value,
  onChange,
  showYear,
  initialYear = 2010,
}) => {
  const todayDate = new Date()
  const year = todayDate.getFullYear()
  const month = todayDate.getMonth()

  const selectMonthRef = useRef()

  const [currentMonth, setCurrentMonth] = useState(value.month || month)

  const [currentYear, setCurrentYear] = useState(value.year || year)

  const [isOpenPicker, setIsOpenPicker] = useState(false)

  const handlerSelectMonth = (e) => {
    e.preventDefault()
    const selectedMonth = +e.target.dataset.month
    if (e.target.classList.contains('disabled')) return
    onChange({ month: selectedMonth, year: currentYear })
    setCurrentMonth(selectedMonth)
    setIsOpenPicker(false)
  }

  const handlerSelectPrevYear = (e) => {
    e.preventDefault()
    if (currentYear > initialYear) setCurrentYear(currentYear - 1)
  }

  const handlerSelectNextYear = (e) => {
    e.preventDefault()
    if (currentYear < year) setCurrentYear(currentYear + 1)
  }

  const handlerSelectPrevMonth = (e) => {
    e.preventDefault()
    if (currentMonth === 0) {
      if (currentYear === initialYear) {
        return
      }

      setCurrentMonth(11)
      onChange({ month: 11, year: currentYear - 1 })
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
      onChange({ month: currentMonth - 1, year: currentYear })
    }
  }

  const handlerSelectNextMonth = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentMonth === 11) {
      setCurrentMonth(0)
      onChange({ month: 0, year: currentYear + 1 })
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
      onChange({ month: currentMonth + 1, year: currentYear })
    }
  }

  const handlerOpenPicker = () => {
    setIsOpenPicker(!isOpenPicker)
  }

  const longMonthName = monthsNamesLong[currentMonth]

  const longMonthNameText = useMemo(() => {
    if (value) {
      if (showYear) {
        return `${longMonthName}, ${value.year} `
      }
      if (value.year && value.year !== year) {
        return `${longMonthName}, ${value.year}`
      }
    }
    return longMonthName
  }, [value, longMonthName, showYear, year])

  const disabledNextYearButton = currentYear === year
  const disabledPrevYearButton = currentYear === initialYear
  const disabledNextMonthButton =
    value.month === month && disabledNextYearButton
  const disabledPrevMonthButton = value.month === 0 && disabledPrevYearButton

  const isMonthDisabled = (index) => index > month && disabledNextYearButton

  const getClassNameForMonth = (index) => {
    const className = styles.day_button
    if (isMonthDisabled(index)) {
      return `${className} ${styles.disabled}`
    }
    if (value.month === index && currentYear === value.year) {
      return `${className} ${styles.active}`
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
      child.parentElement.classList.contains(styles.select_month_container) ===
        parent.classList.contains(styles.select_month_container)
    ) {
      res = true
    } else {
      res = checkIsParentNode(parent, child.parentElement)
    }
    return res
  }, [])

  const callbackEventListener = useCallback(
    (event) => {
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

  useEffect(() => {
    setCurrentYear(value.year)
    setCurrentMonth(value.month)
  }, [value])

  return (
    <div
      className={`${styles.container} ${isOpenPicker && styles.open}`}
      ref={selectMonthRef}
    >
      <button
        className={`${styles.prev_month_btn} ${
          disabledPrevMonthButton && styles.disabled
        }`}
        onClick={handlerSelectPrevMonth}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={styles.icon_change_month_button}
        />
      </button>
      <div className={styles.data_title_container} onClick={handlerOpenPicker}>
        <FontAwesomeIcon icon={faCalendar} className={styles.calendar_icon} />
        <span className={styles.data_title}>{longMonthNameText}</span>
      </div>
      <button
        className={`${styles.next_month_btn} ${
          disabledNextMonthButton && styles.disabled
        }`}
        disabled={disabledNextMonthButton}
        onClick={handlerSelectNextMonth}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={styles.icon_change_month_button}
        />
      </button>
      {isOpenPicker && (
        <div className={styles.select_month_container}>
          <div className={styles.select_year}>
            <button
              className={`${styles.prev_month_btn} ${
                disabledPrevYearButton && styles.disabled
              }`}
              onClick={handlerSelectPrevYear}
            >
              <FontAwesomeIcon
                icon={faCaretLeft}
                className={styles.icon_change_month_button}
              />
            </button>
            <span className={styles.current_year}>{currentYear}</span>
            <button
              className={`${styles.next_month_btn} ${
                disabledNextYearButton && styles.disabled
              }`}
              disabled={disabledNextYearButton}
              onClick={handlerSelectNextYear}
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                className={styles.icon_change_month_button}
              />
            </button>
          </div>
          <div className={styles.month_list_container}>
            {monthsNamesShort.map((item, index) => (
              <button
                key={item}
                disabled={isMonthDisabled(index)}
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

SelectMonth.defaultProps = {
  showYear: false,
}

SelectMonth.propTypes = {
  value: PropTypes.shape({
    month: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  showYear: PropTypes.bool,
}
