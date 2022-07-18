import React from 'react'
import './headerProjectReport.scss'
import { GoogleSyncButton } from './GoogleSyncButton'

function HeaderProjectReport(props) {
  const { name } = props

  return (
    <>
      <div className="project_report_header">
        <span className="header_title">{name}</span>
        <GoogleSyncButton />
      </div>
    </>
  )
}

export default HeaderProjectReport
