import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'custom-hook/useSearchParams'
import { useDispatch } from 'react-redux'
import {
  getUsersHoursTokenRequest,
  googleAuthChangeGoogleSheetIsAgree,
  googleAuthChangeGoogleSheetLink,
  googleAuthSendGoogleSheetSyncRequest,
} from 'actions/google-auth-success'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import {
  getGoogleSheetSyncInputLink,
  getLoading,
  googleSheetSyncIsAgree,
} from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const isLoading = useShallowEqualSelector(getLoading)
  const history = useHistory()
  const googleSheetSyncLink = useShallowEqualSelector(
    getGoogleSheetSyncInputLink
  )
  const googleSheetSyncCurrentIsAgree = useShallowEqualSelector(
    googleSheetSyncIsAgree
  )

  const onGoogleSheetSyncLinkChange = (event) =>
    dispatch(googleAuthChangeGoogleSheetLink(event.target.value))
  const onGoogleSheetSyncIsAgreeChange = (event) =>
    dispatch(googleAuthChangeGoogleSheetIsAgree(event.target.checked))
  const onGoogleSheetSync = () =>
    dispatch(googleAuthSendGoogleSheetSyncRequest())

  const state = useMemo(() => searchParams.get('state'), [])

  //todo: delete for prod
  const url = window.location.href.replace('http', 'https')

  useEffect(() => {
    dispatch(
      getUsersHoursTokenRequest({
        state,
        callback_url: url,
      })
    )
  }, [])

  if (!state) {
    history.push({
      pathname: '/projectreport',
      state: { from: 'google-sync-non-auth' },
    })
  }

  return isLoading ? (
    <SpinnerStyled />
  ) : (
    <div>
      <TextField
        onChange={onGoogleSheetSyncLinkChange}
        value={googleSheetSyncLink}
      />
      <TextField
        type="checkbox"
        value={googleSheetSyncCurrentIsAgree}
        onChange={onGoogleSheetSyncIsAgreeChange}
      />
      <Button>Sync</Button>
    </div>
  )
}
