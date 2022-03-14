import React, { } from 'react'
import './headerProjectReport.scss'

function HeaderProjectReport (props) {
  const { name } = props;

  return (
    <>
      <div className="project_report_header">
        <span className="header_title">{name}</span>
      </div>
    </>
  )
}

export default HeaderProjectReport;