import React from 'react'
import './headerProjectReport.scss'
import { GoogleSyncButton } from './GoogleSyncButton'
import { getUserPermissions } from 'selectors/user'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { userPermissions } from 'constants/permissions'

const HeaderProjectReport = ({ name }) => {
  const permissions = useShallowEqualSelector(getUserPermissions)

  const isHaveAccess = permissions?.includes(
    userPermissions.users_can_view_syncdrive
  )

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
