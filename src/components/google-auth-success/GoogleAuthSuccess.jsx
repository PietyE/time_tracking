import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Button,
  TextField,
  Checkbox,
  Box,
  Typography,
  Divider,
} from '@material-ui/core'
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
import { PageHeader } from 'components/common/PageHeader'
import './GoogleAuthSucess.scss'
import { GoogleSheetInputMemoized as GoogleSheetInput } from './components/GoogleSheetInput'
import { GoogleSheetCheckboxMemoized as GoogleSheetCheckbox } from './components/GoogleSheetCheckbox'
import { GoogleSheetSyncButtonMemoized as GoogleSheetSyncButton } from './components/GoogleSheetSyncButton'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const isLoading = useShallowEqualSelector(getLoading)
  const history = useHistory()

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
      <Box className="google-auth-success-container">
        <Box className="google-auth-success-container-form">
          <Box className="google-auth-success-container-form-header">
            <Typography
              variant="h6"
              component="p"
              className="google-auth-success-container-form-header-title"
            >
              Paste the link to google sheet
            </Typography>
            <Divider variant="fullWidth" />
          </Box>
          <Box className="google-auth-success-container-form-actions">
            <GoogleSheetInput />
            <GoogleSheetCheckbox />
            <GoogleSheetSyncButton />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
