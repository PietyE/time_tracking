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
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { useDispatch } from 'react-redux'
import styles from './SelectMonth.module.scss'
import { changeSelectedDate } from '../../../actions/calendar'

export const SelectMonth = ({ onChange, showYear, initialYear = 2010 }) => {
  const todayDate = new Date()
  const year = todayDate.getFullYear()
  const month = todayDate.getMonth()

  const { month: currentMonth, year: currentYear } = useShallowEqualSelector()
  const dispatch = useDispatch()

  const selectMonthRef = useRef()

  const [isOpenPicker, setIsOpenPicker] = useState(false)

  const handlerSelectMonth = (e) => {
    e.preventDefault()
    const selectedMonth = +e.target.dataset.month
    if (e.target.classList.contains('disabled')) return
    onChange({ month: selectedMonth, year: currentYear })
    dispatch(changeSelectedDate({ month: selectedMonth }))
    setIsOpenPicker(false)
  }

  const handlerSelectPrevYear = (e) => {
    e.preventDefault()
    if (currentYear > initialYear)
      dispatch(changeSelectedDate({ year: currentYear - 1 }))
  }

  const handlerSelectNextYear = (e) => {
    e.preventDefault()
    if (currentYear < year)
      dispatch(changeSelectedDate({ year: currentYear + 1 }))
  }

  const handlerSelectPrevMonth = (e) => {
    e.preventDefault()
    if (currentMonth === 0) {
      if (currentYear === initialYear) {
        return
      }

      dispatch(changeSelectedDate({ month: 11 }))
      onChange({ month: 11, year: currentYear - 1 })
      dispatch(changeSelectedDate({ year: currentYear - 1 }))
    } else {
      dispatch(changeSelectedDate({ month: currentMonth - 1 }))
      onChange({ month: currentMonth - 1, year: currentYear })
    }
  }

  const handlerSelectNextMonth = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentMonth === 11) {
      dispatch(changeSelectedDate({ month: 0 }))
      onChange({ month: 0, year: currentYear + 1 })
      dispatch(changeSelectedDate({ year: currentYear + 1 }))
    } else {
      dispatch(changeSelectedDate({ month: currentMonth + 1 }))
      onChange({ month: currentMonth + 1, year: currentYear })
    }
  }

  const handlerOpenPicker = () => {
    setIsOpenPicker(!isOpenPicker)
  }

  const longMonthName = monthsNamesLong[currentMonth]

  const longMonthNameText = useMemo(() => {
    if (currentYear || currentMonth) {
      if (showYear) {
        return `${longMonthName}, ${currentYear} `
      }
      if (currentYear) {
        return `${longMonthName}, ${currentYear}`
      }
    }
    return longMonthName
  }, [currentYear, currentMonth, longMonthName, showYear, year])

  const disabledNextYearButton = currentYear === year
  const disabledPrevYearButton = currentYear === initialYear
  const disabledNextMonthButton =
    currentMonth === month && disabledNextYearButton
  const disabledPrevMonthButton = currentMonth === 0 && disabledPrevYearButton

  const isMonthDisabled = (index) => index > month && disabledNextYearButton

  const getClassNameForMonth = (index) => {
    const className = styles.day_button
    if (isMonthDisabled(index)) {
      return `${className} ${styles.disabled}`
    }
    if (currentMonth === index && currentYear === currentYear) {
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
  onChange: PropTypes.func.isRequired,
  showYear: PropTypes.bool,
}
