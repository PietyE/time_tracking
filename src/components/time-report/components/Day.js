import React, { useState, memo, useEffect } from 'react'

import HeaderDay from './HeaderDay'
import CreateReportForm from './CreateReportForm'
import ReportItem from './ReportItem'
import FooterDay from './FooterDay'
import { parseMinToHoursAndMin } from 'utils/common'

function Day({
  numberOfDay,
  selectedDate,
  descriptions = [],
  addTimeReport,
  showEmpty,
  isOpenCreate,
}) {
  const [isCreate, setIsCreate] = useState(false)
  const [classNameForEndAnimation, setClassNameForEndAnimation] = useState('')
  const [editObj, setEditObj] = useState({ text: '', hours: '' })

  const handlerAddDayReport = e => {
    e.preventDefault()
    if (isCreate) {
      setClassNameForEndAnimation('close')
      return
    }
    setIsCreate(true)
  }

  const dayTitle = new Date(
    selectedDate.year,
    selectedDate.month,
    numberOfDay
  ).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })

  const todayStr = isOpenCreate ? '(today)' : ''

  const sumHours = descriptions.reduce(
    (sum, item) => (sum = sum + item.duration),
    0
  )

  const handlerEndAnimation = () => {
    if (classNameForEndAnimation) {
      setClassNameForEndAnimation('')
      setIsCreate(false)
    }
  }

  const editingItemRow = (text, hours) => {
    setEditObj({ text, hours })
  }

  useEffect(() => {
    setIsCreate(isOpenCreate)
  }, [selectedDate, isOpenCreate])

  if (!showEmpty && !descriptions.length && !isOpenCreate) {
    return null
  }
  return (
    <div className="time_report_day_container">
      <HeaderDay
        handlerAddDayReport={handlerAddDayReport}
        isCreate={isCreate}
        dayTitle={dayTitle}
        todayStr={todayStr}
        classNameForEndAnimation={classNameForEndAnimation}
      />
      {isCreate && (
        <CreateReportForm
          addTimeReport={addTimeReport}
          numberOfDay={numberOfDay}
          selectedDate={selectedDate}
          setIsCreate={setIsCreate}
          isCreate={isCreate}
          isOpenCreate={isOpenCreate}
          extraClassName={classNameForEndAnimation}
          handlerEndAnimation={handlerEndAnimation}
          editingTextValue={editObj.text}
          editingHoursValue={editObj.hours}
        />
      )}
      {descriptions.map(({ title, duration, id }) => (
        <ReportItem
          key={id}
          text={title}
          hours={duration}
          id={id}
          editingItemRow={editingItemRow}
        />
      ))}
      <FooterDay sumHours={sumHours} />
    </div>
  )
}

const shouldComponentUpdate = (prevProps, nextProps) => {
  if (
    JSON.stringify(prevProps.descriptions) !==
      JSON.stringify(nextProps.descriptions) ||
    prevProps.numberOfDay !== nextProps.numberOfDay ||
    prevProps.selectedDate.year !== nextProps.selectedDate.year ||
    prevProps.selectedDate.month !== nextProps.selectedDate.month ||
    prevProps.showEmpty !== nextProps.showEmpty ||
    prevProps.isOpenCreate !== nextProps.isOpenCreate
  ) {
    return false
  }
  return true
}

export default memo(Day, shouldComponentUpdate)
