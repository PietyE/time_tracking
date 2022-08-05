import React, { useCallback } from 'react'
import { TextField } from '@material-ui/core'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getGoogleSheetSyncInputLink } from 'selectors/google-auth-success'
import { googleAuthChangeGoogleSheetLink } from 'actions/google-auth-success'
import { useDispatch } from 'react-redux'

const GoogleSheetInput = () => {
  const googleSheetSyncLink = useShallowEqualSelector(
    getGoogleSheetSyncInputLink
  )

  const dispatch = useDispatch()

  const handleChange = useCallback(
    (event) => dispatch(googleAuthChangeGoogleSheetLink(event.target.value)),
    []
  )

  return <TextField onChange={handleChange} value={googleSheetSyncLink} />
}

export const GoogleSheetInputMemoized = React.memo(GoogleSheetInput)
