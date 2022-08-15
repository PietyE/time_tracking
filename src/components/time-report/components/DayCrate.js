import React from 'react'
import HeaderDay from './HeaderDay'
// import ActivitySelect from "./ActivitySelect";
import CreateReportForm from './CreateReportForm'

function DayCrate({
  numberOfDay,
  selectedDate,
  descriptions = [],
  addTimeReport,
  isCreate,
  handlerAddDayReport,
  dayTitle,
  todayStr,
  classNameForEndAnimation,
  weekEndClassName,
  sumHours,
  isCreateList,
}) {
  return (
    <div>
      <div
        className={
          'time_report_day_container_create ' +
          (descriptions.length ? 'past' : '')
        }
      >
        <HeaderDay
          handlerAddDayReport={handlerAddDayReport}
          isCreate={isCreate}
          isCrateList={isCreateList}
          dayTitle={dayTitle}
          todayStr={todayStr}
          classNameForEndAnimation={classNameForEndAnimation}
          weekEndClassName={weekEndClassName}
        />
        <CreateReportForm
          addTimeReport={addTimeReport}
          numberOfDay={numberOfDay}
          selectedDate={selectedDate}
          sumHours={sumHours}
        />
      </div>
    </div>
  )
}
export default DayCrate
