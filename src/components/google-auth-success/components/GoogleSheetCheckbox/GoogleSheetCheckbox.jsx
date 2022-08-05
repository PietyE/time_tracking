import React, { useCallback } from 'react'
import { Checkbox } from '@material-ui/core'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { googleSheetSyncIsAgree } from 'selectors/google-auth-success'
import { useDispatch } from 'react-redux'
import { googleAuthChangeGoogleSheetIsAgree } from '../../../../actions/google-auth-success'

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
    <Checkbox
      type="checkbox"
      checked={googleSheetSyncCurrentIsAgree}
      onChange={handleChange}
    />
  )
}

export const GoogleSheetCheckboxMemoized = React.memo(GoogleSheetCheckbox)
