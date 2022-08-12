import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'
import { useSearchParams } from 'custom-hook/useSearchParams'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getLoading } from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import { Container } from 'components/ui/container'
import { PageHeader } from 'components/common/PageHeader'
import { GoogleSheetInputMemoized as GoogleSheetInput } from './components/GoogleSheetInput'
import { GoogleSheetSyncButtonMemoized as GoogleSheetSyncButton } from './components/GoogleSheetSyncButton'
import { GoogleModal } from './components/Modal'
import { GoogleSheetFormHeader } from './components/GoogleSheetFormHeader'
import './GoogleAuthSucess.scss'

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
          <GoogleSheetFormHeader />
          <Box className="google-auth-success-container-form-actions">
            <GoogleSheetInput />
            <GoogleSheetSyncButton />
          </Box>
        </Box>
      </Box>
      <GoogleModal />
    </Container>
  )
}
