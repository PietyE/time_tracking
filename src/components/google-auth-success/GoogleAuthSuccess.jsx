import React, { useEffect, useMemo } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import {
  getUsersHoursTokenRequest,
  googleAuthChangeSelectedDate,
} from 'actions/google-auth-success'
import { useSearchParams } from 'custom-hook/useSearchParams'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import {
  getAccessError,
  getLoading,
  getSelectedDate,
} from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import { Container } from 'components/ui/container'
import { PageHeader } from 'components/common/PageHeader'
import { GoogleSheetInputMemoized as GoogleSheetInput } from './components/GoogleSheetInput'
import { GoogleSheetSyncButtonMemoized as GoogleSheetSyncButton } from './components/GoogleSheetSyncButton'
import { GoogleModal } from './components/Modal'
import { GoogleSheetFormHeader } from './components/GoogleSheetFormHeader'
import './GoogleAuthSucess.scss'
import SelectMonth from 'components/ui/select-month'

const GoogleAuthSuccess = ({ googleAuthChangeSelectedDate }) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const isLoading = useShallowEqualSelector(getLoading)
  const history = useHistory()
  const accessError = useShallowEqualSelector(getAccessError)
  const selectedDate = useShallowEqualSelector(getSelectedDate)

  const state = useMemo(() => searchParams.get('state'), [])

  useEffect(() => {
    dispatch(
      getUsersHoursTokenRequest({
        state,
        callback_url: window.location.href.replace('http', 'https'),
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

  if (accessError) {
    history.push('/projectreport')
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
            <SelectMonth
              onChange={googleAuthChangeSelectedDate}
              value={selectedDate}
              showYear
            />
            <GoogleSheetInput />
            <GoogleSheetSyncButton />
          </Box>
        </Box>
      </Box>
      <GoogleModal />
    </Container>
  )
}

export default connect(null, {
  googleAuthChangeSelectedDate,
})(GoogleAuthSuccess)
