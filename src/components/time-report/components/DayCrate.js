import React from 'react'
import HeaderDay from "./HeaderDay";
import ActivitySelect from "./ActivitySelect";
import CreateReportForm from "./CreateReportForm";
import {setUserStatus} from "../../../actions/times-report";


function DayCrate({numberOfDay,
                      selectedDate,
                      descriptions = [],
                      addTimeReport,
                      showEmpty,
                      isOpenCreate,
                      isOneProject,
                      savePosition,
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
                      setUserStatus
                  }) {
    return<div >
        {isCreate && (
            <div className={'time_report_day_container_create '+(descriptions.length ?'past':'') }>
                <HeaderDay
                    handlerAddDayReport={handlerAddDayReport}
                    isCreate={isCreate}
                    isCrateList = {isCreateList}
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
                    savePosition={savePosition}
                    selectDayStatus={selectDayStatus}
                    selectedDayStatus={selectedDayStatus}
                    setUserStatus={setUserStatus}
                />

            </div>
        )}
    </div>



}
export  default DayCrate