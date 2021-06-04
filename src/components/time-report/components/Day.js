import React, { useState, memo } from 'react'

import HeaderDay from './HeaderDay'
import CreateReportForm from './CreateReportForm'
import ReportItem from './ReportItem'
import FooterDay from './FooterDay'

function Day({
  numberOfDay,
  selectedDate,
  descriptions = [],
  addTimeReport,
  showEmpty,
  isOpenCreate,
  isOneProject,
}) {
  const [isCreate, setIsCreate] = useState(true)
  const [classNameForEndAnimation, setClassNameForEndAnimation] = useState('')

  const handlerAddDayReport = (e) => {
    e.preventDefault()
    if (isCreate) {
      setClassNameForEndAnimation('close')
      return
    }
    setIsCreate(true)
  }

  const day = new Date(selectedDate.year, selectedDate.month, numberOfDay)
  const dayOfWeek = day.getDay()

  const dayTitle = day.toLocaleDateString('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const todayStr = isOpenCreate ? '(today)' : ''
  const weekEndClassName =
    dayOfWeek === 0 || dayOfWeek === 6 ? 'text-danger' : ''
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
        weekEndClassName={weekEndClassName}
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
        />
      )}
      {descriptions.map(({ title, duration, id }) => (
        <ReportItem
          key={id}
          text={title}
          hours={duration}
          id={id}
          isOneProject={isOneProject}
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
