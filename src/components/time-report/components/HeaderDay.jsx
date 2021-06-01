import React, { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function HeaderDay({
  handlerAddDayReport,
  isCreate,
  dayTitle,
  todayStr,
  classNameForEndAnimation,
  weekEndClassName
}) {
  return (
    <div className="time_report_day_header">
      <span className={`time_report_day_title ${weekEndClassName}`}>{`${dayTitle}th ${todayStr}`}</span>
      <button className="time_report_day_addbtn" onClick={handlerAddDayReport}>
        <FontAwesomeIcon
          icon={faPlus}
          className={
            isCreate && !classNameForEndAnimation
              ? 'add_icon create_icon'
              : 'add_icon delete_icon'
          }
        />
      </button>
    </div>
  )
}

export default memo(HeaderDay)
