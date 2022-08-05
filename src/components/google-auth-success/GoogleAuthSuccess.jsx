import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, TextField, Checkbox } from '@material-ui/core'
import {
  getUsersHoursTokenRequest,
  googleAuthChangeGoogleSheetIsAgree,
  googleAuthChangeGoogleSheetLink,
  googleAuthSendGoogleSheetSyncRequest,
} from 'actions/google-auth-success'
import { useSearchParams } from 'custom-hook/useSearchParams'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import {
  getGoogleSheetSyncInputLink,
  getLoading,
  googleSheetSyncIsAgree,
} from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import { Container } from 'components/ui/container'
import HeaderProjectReport from 'components/project-report-new-design/components/HeaderProjectReport/HeaderProjectReport'
import { PageHeader } from '../common/PageHeader'

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

  //if you entered not from google auth
  if (!state) {
    history.push({
      pathname: '/projectreport',
      state: { from: 'google-sync-non-auth' },
    })
  }

  return isLoading ? (
    <SpinnerStyled />
  ) : (
    <Container>
      <PageHeader name="Project report" />
      <TextField
        onChange={onGoogleSheetSyncLinkChange}
        value={googleSheetSyncLink}
      />
      <Checkbox
        type="checkbox"
        checked={googleSheetSyncCurrentIsAgree}
        onChange={onGoogleSheetSyncIsAgreeChange}
      />
      <Button onClick={onGoogleSheetSync}>Sync</Button>
    </Container>
  )
}
