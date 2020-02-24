import React, { memo } from 'react'
import { parseMinToHoursAndMin } from 'utils/common'

function FooterDay({ sumHours }) {
  return (
    <div className="time_report_day_footer">
      <span>{parseMinToHoursAndMin(sumHours)}</span>
    </div>
  )
}

export default memo(FooterDay)
