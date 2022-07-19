import React from 'react'
import { ReactComponent as GoogleDrive } from '../../../../../images/googleDriveButton/googleDrive.svg'
import { CustomButton } from '../../../../ui/button'
import { useDispatch } from 'react-redux'
import { getUsersHoursAuthUrlRequest } from '../../../../../actions/projects-report'
import './GoogleSyncButton.scss'

export const GoogleSyncButton = () => {
  const dispatch = useDispatch()
  const syncWithGoogleDrive = () => dispatch(getUsersHoursAuthUrlRequest())

  return (
    <CustomButton
      type="button"
      startIcon={<GoogleDrive />}
      className="header_google_drive_sync_button"
      variant="outline-secondary"
      onClick={syncWithGoogleDrive}
    >
      Sync with Drive
    </CustomButton>
  )
}
