import React, { memo } from 'react'

function FooterDay({ sumHours = '00' }) {
  return (
    <div className="time_report_day_footer">
      <span>{`Daily Total: ${sumHours}:00`}</span>
    </div>
  )
}

export default memo(FooterDay)
