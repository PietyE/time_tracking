import React, { useState, memo, useEffect } from 'react'

import HeaderDay from './HeaderDay'
import CreateReportForm from './CreateReportForm'
import ReportItem from './ReportItem'
import FooterDay from './FooterDay'

function Day({
  numberOfDay,
  selectedDate,
  descriptions,
  addTimeReport,
  showEmpty,
}) {
  const today = new Date()
  const isOpenCreate =
    today.getDate() === numberOfDay &&
    today.getMonth() === selectedDate.month &&
    today.getFullYear() === selectedDate.year

  const [isCreate, setIsCreate] = useState(false)
  const [classNameForEndAnimation, setClassNameForEndAnimation] = useState('')

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
    (sum, item) => (sum = sum + item.duration / 60),
    0
  )

  const handlerEndAnimation = () => {
    if (classNameForEndAnimation) {
      setClassNameForEndAnimation('')
      setIsCreate(false)
    }
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
      {descriptions.map(({ text, duration, id }) => (
        <ReportItem key={id} text={text} hours={duration / 60} />
      ))}
      <FooterDay sumHours={sumHours} />
    </div>
  )
}

export default memo(Day)
