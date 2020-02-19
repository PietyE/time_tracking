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

  const handlerAddDayReport = e => {
    e.preventDefault()
    setIsCreate(!isCreate)
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

  useEffect(() => {
    setIsCreate(isOpenCreate)
  }, [isOpenCreate])

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
        />
      )}
      {descriptions.map(({ text, duration, id }) => (
        <ReportItem key={id} text={text} hours={duration / 60} />
      ))}
      <FooterDay sumHours={sumHours} />
    </div>
  )
}

// function areEqual(prevProps, nextProps) {
//   if (prevProps.selectedDate.year !== nextProps.selectedDate.year) {
//     return false
//   }
//   if (prevProps.selectedDate.month !== nextProps.selectedDate.month) {
//     return false
//   }
//   if (
//     JSON.stringify(prevProps.descriptions) ===
//     JSON.stringify(nextProps.descriptions)
//   ) {
//     return true
//   }

//   return false
// }

export default memo(Day)
