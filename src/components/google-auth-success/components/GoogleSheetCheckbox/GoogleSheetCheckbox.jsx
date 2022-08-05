import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { googleSheetSyncIsAgree } from 'selectors/google-auth-success'
import { useDispatch } from 'react-redux'
import { googleAuthChangeGoogleSheetIsAgree } from 'actions/google-auth-success'
import './GoogleSheetCheckbox.scss'

const GoogleSheetCheckbox = () => {
  const googleSheetSyncCurrentIsAgree = useShallowEqualSelector(
    googleSheetSyncIsAgree
  )
  const dispatch = useDispatch()

  const handleChange = useCallback(
    (event) =>
      dispatch(googleAuthChangeGoogleSheetIsAgree(event.target.checked)),
    []
  )
  return (
    <FormControlLabel
      control={
        <Checkbox
          type="checkbox"
          checked={googleSheetSyncCurrentIsAgree}
          onChange={handleChange}
          className="google-sheet-checkbox"
        />
      }
      label="Sync with my spreadsheet"
      className="google-sheet-checkbox-label"
    />
  )
}

export const GoogleSheetCheckboxMemoized = React.memo(GoogleSheetCheckbox)
