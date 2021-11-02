import React, { } from 'react'

import download from '../../../images/projectReportIcons/download.svg'

function HeaderProjectReport () {
  return (
    <>
      <div className="project_report_header">
        <span className="header_title">Project report</span>
        <div className="project_report_export_button">
          <img src={download} alt="download" className="export_button_img"/>
          <span className="export_button_text">Export in XLSX</span>
        </div>
      </div>
    </>
  )
}

export default HeaderProjectReport;