import React, { memo } from 'react'

function HeaderDay({
                      dayTitle,
                      todayStr,
                      weekEndClassName
}) {

  return (
    <div className="time_report_day_header">
      <span className={`time_report_day_title`}>
        <span className={`${weekEndClassName} ${todayStr ? 'today_day':''}` }>{`${dayTitle} ${todayStr}`}</span>
      </span>
    </div>
  )
}

export default memo(HeaderDay)
