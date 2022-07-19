import React from 'react'
import { ReactComponent as GoogleDrive } from '../../../../../images/googleDriveButton/googleDrive.svg'
import './GoogleSyncButton.scss'

export const GoogleSyncButton = () => (
  <button type="button" className="header_google_drive_sync_button">
    <GoogleDrive />
    <p className="header_google_drive_sync_button_text">Sync with Drive</p>
  </button>
)
