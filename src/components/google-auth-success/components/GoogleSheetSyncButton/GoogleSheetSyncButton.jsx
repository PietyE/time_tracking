import React from 'react'
import { Button } from '@material-ui/core'
import { googleAuthSendGoogleSheetSyncRequest } from 'actions/google-auth-success'
import { useDispatch } from 'react-redux'
import { ReactComponent as ConfirmIcon } from 'images/configrm.svg'
import './GoogleSheetSyncButton.scss'

const GoogleSheetSyncButton = () => {
  const dispatch = useDispatch()

  const onGoogleSheetSync = () =>
    dispatch(googleAuthSendGoogleSheetSyncRequest())
  return (
    <Button
      onClick={onGoogleSheetSync}
      variant="contained"
      color="primary"
      startIcon={<ConfirmIcon />}
      className="google-sheet-button"
    >
      Submit
    </Button>
  )
}

export const GoogleSheetSyncButtonMemoized = React.memo(GoogleSheetSyncButton)
