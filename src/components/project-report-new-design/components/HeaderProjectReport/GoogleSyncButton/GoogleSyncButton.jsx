import React from 'react'
import { ReactComponent as GoogleDrive } from '../../../../../images/googleDriveButton/googleDrive.svg'
import { CustomButton } from '../../../../ui/button'
import './GoogleSyncButton.scss'

export const GoogleSyncButton = () => (
  <CustomButton
    type="button"
    startIcon={<GoogleDrive />}
    className="header_google_drive_sync_button"
    variant="outline-secondary"
  >
    Sync with Drive
  </CustomButton>
)
