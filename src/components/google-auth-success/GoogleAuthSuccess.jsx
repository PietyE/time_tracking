import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'custom-hook/useSearchParams'
import { useDispatch } from 'react-redux'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getLoading } from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'

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
      <TextField />
      <Button>Sync</Button>
    </div>
  )
}
