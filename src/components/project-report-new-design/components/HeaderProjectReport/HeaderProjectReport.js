import React from 'react'
import './headerProjectReport.scss'
import { GoogleSyncButton } from './GoogleSyncButton'
import { getRoleUser, getUserPermissions } from 'selectors/user'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { ACCOUNTANT, ADMIN } from 'constants/role-constant'
import { userPermissions } from 'constants/permissions'

const HeaderProjectReport = ({ name }) => {
  const role = useShallowEqualSelector(getRoleUser)
  const permissions = useShallowEqualSelector(getUserPermissions)

  const isHaveAccess =
    role === ADMIN ||
    role === ACCOUNTANT ||
    permissions?.includes(userPermissions.gsheets_add_accesscredentials)

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
