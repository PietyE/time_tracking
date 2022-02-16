import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function HeaderDay({
                      handlerAddDayReport,
                      isCreate,
                       isCrateList,
                      dayTitle,
                      todayStr,
                      classNameForEndAnimation,
                      weekEndClassName
}) {

  return (
    <div className="time_report_day_header">
        <button className={!isCrateList?'time_report_day_add':'time_report_day_addbtn'
            +(isCrateList && isCreate?' active':'')} onClick={isCrateList?handlerAddDayReport:undefined}>
            <FontAwesomeIcon
                icon={faPlus}
                className={
                    isCreate && !classNameForEndAnimation
                        ? 'add_icon create_icon'
                        : 'add_icon delete_icon'

                }
            />
        </button>
      <span className={`time_report_day_title`}>
        <span className={`${weekEndClassName}`}>{`${dayTitle} ${todayStr}`}</span>
      </span>
    </div>
  )
}

export default memo(HeaderDay)
