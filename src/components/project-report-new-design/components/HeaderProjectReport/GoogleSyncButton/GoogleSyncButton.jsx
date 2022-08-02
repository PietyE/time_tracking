import React, { useEffect, useCallback } from 'react'
import { ReactComponent as GoogleDrive } from '../../../../../images/googleDriveButton/googleDrive.svg'
import { CustomButton } from '../../../../ui/button'
import { useDispatch } from 'react-redux'
import { getUsersHoursAuthUrlRequest } from '../../../../../actions/projects-report'
import useShallowEqualSelector from '../../../../../custom-hook/useShallowEqualSelector'
import { getGoogleSyncWithDriveUrl } from '../../../../../reducers/projects-report'
import './GoogleSyncButton.scss'

export const GoogleSyncButton = () => {
  const google_auth_url = useShallowEqualSelector(getGoogleSyncWithDriveUrl)
  const dispatch = useDispatch()

  useEffect(() => {
    if (google_auth_url) window.location.href = google_auth_url
  }, [google_auth_url])

  const syncWithGoogleDrive = useCallback(
    () => dispatch(getUsersHoursAuthUrlRequest()),
    []
  )
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
