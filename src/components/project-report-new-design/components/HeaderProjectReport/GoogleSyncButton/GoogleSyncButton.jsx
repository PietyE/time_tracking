import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersHoursAuthUrlRequest } from 'actions/projects-report'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getGoogleSyncWithDriveUrl } from 'reducers/projects-report'
import { ReactComponent as GoogleDrive } from 'images/googleDriveButton/googleDrive.svg'
import { CustomButton } from 'components/ui/button'
import './GoogleSyncButton.scss'
import { getUserPermissions } from 'selectors/user'
import { userPermissions } from '../../../../../constants/permissions'

export const GoogleSyncButton = () => {
  const google_auth_url = useShallowEqualSelector(getGoogleSyncWithDriveUrl)
  const dispatch = useDispatch()
  const permissions = useShallowEqualSelector(getUserPermissions)

  const canUseGoogleSync =
    permissions?.includes(userPermissions.gsheets_add_accesscredentials) &&
    permissions?.includes(userPermissions.users_add_user)

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
      disabled={!canUseGoogleSync}
      startIcon={<GoogleDrive />}
      className="header_google_drive_sync_button"
      variant="outline-secondary"
      onClick={syncWithGoogleDrive}
    >
      Sync with Drive
    </CustomButton>
  )
}
