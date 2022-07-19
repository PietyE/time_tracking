import React from 'react'
import './headerProjectReport.scss'
import { GoogleSyncButton } from './GoogleSyncButton'
import { getRoleUser } from '../../../../selectors/user'
import useShallowEqualSelector from '../../../../custom-hook/useShallowEqualSelector'
import { ACCOUNTANT } from '../../../../constants/role-constant'

function HeaderProjectReport(props) {
  const { name } = props

  const role = useShallowEqualSelector(getRoleUser)

  const renderGoogleDriveSyncButton = role === ACCOUNTANT && (
    <GoogleSyncButton />
  )

  return (
    <>
      <div className="project_report_header">
        <span className="header_title">{name}</span>
        {renderGoogleDriveSyncButton}
      </div>
    </>
  )
}

export default HeaderProjectReport
