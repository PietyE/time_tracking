import React from 'react'
import { Button } from '@material-ui/core'
import { googleAuthSendGoogleSheetSyncRequest } from 'actions/google-auth-success'
import { useDispatch } from 'react-redux'

const GoogleSheetSyncButton = () => {
  const dispatch = useDispatch()

  const onGoogleSheetSync = () =>
    dispatch(googleAuthSendGoogleSheetSyncRequest())
  return <Button onClick={onGoogleSheetSync}>Sync</Button>
}

export const GoogleSheetSyncButtonMemoized = React.memo(GoogleSheetSyncButton)
