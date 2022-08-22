import React from 'react'
import './headerProjectReport.scss'
import { GoogleSyncButton } from './GoogleSyncButton'
import { getRoleUser } from 'selectors/user'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { ACCOUNTANT, ADMIN } from 'constants/role-constant'

const HeaderProjectReport = ({ name }) => {
  const role = useShallowEqualSelector(getRoleUser)

  const isHaveAccess = role === ADMIN || role === ACCOUNTANT

  const renderGoogleDriveSyncButton = isHaveAccess && <GoogleSyncButton />

  return (
    <div className="project_report_header">
      <span className="header_title">{name}</span>
      {renderGoogleDriveSyncButton}
    </div>
  )
}

const HeaderProjectReportMemoized = React.memo(HeaderProjectReport)

export default HeaderProjectReportMemoized
