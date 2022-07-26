import React from 'react'
import HeaderDay from './HeaderDay'
// import ActivitySelect from "./ActivitySelect";
import CreateReportForm from './CreateReportForm'

function DayCrate({
  numberOfDay,
  selectedDate,
  descriptions = [],
  addTimeReport,
  //   showEmpty,
  isOpenCreate,
  //   isOneProject,
  isCreate,
  handlerAddDayReport,
  dayTitle,
  todayStr,
  classNameForEndAnimation,
  weekEndClassName,
  setIsCreate,
  handlerEndAnimation,
  sumHours,
  isCreateList,
  selectDayStatus,
  selectedDayStatus,
  setUserStatus,
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
          setIsCreate={setIsCreate}
          isCreate={isCreate}
          isOpenCreate={isOpenCreate}
          extraClassName={classNameForEndAnimation}
          handlerEndAnimation={handlerEndAnimation}
          sumHours={sumHours}
          selectDayStatus={selectDayStatus}
          selectedDayStatus={selectedDayStatus}
          setUserStatus={setUserStatus}
        />
      </div>
    </div>
  )
}
export default DayCrate
