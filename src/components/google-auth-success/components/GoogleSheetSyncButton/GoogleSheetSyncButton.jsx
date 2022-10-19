import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { ReactComponent as ConfirmIcon } from 'images/configrm.svg'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getGoogleSheetSyncInputLink } from 'selectors/google-auth-success'
import { onGoogleSync } from './helpers'
import './GoogleSheetSyncButton.scss'

const MemoizedConfirmIcon = React.memo(ConfirmIcon)

const GoogleSheetSyncButton = ({ setValidationError }) => {
  const dispatch = useDispatch()
  const googleSheetLink = useShallowEqualSelector(getGoogleSheetSyncInputLink)
  const googleSheetSyncLink = useShallowEqualSelector(
    getGoogleSheetSyncInputLink
  )

  const handleClick = () =>
    onGoogleSync(dispatch)(googleSheetLink, setValidationError)

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      startIcon={<MemoizedConfirmIcon />}
      className="google-sheet-button"
      disabled={!googleSheetSyncLink}
    >
      Submit
    </Button>
  )
}

export const GoogleSheetSyncButtonMemoized = React.memo(GoogleSheetSyncButton)
