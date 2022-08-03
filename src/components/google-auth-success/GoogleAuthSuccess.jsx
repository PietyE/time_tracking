import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'custom-hook/useSearchParams'
import { useDispatch } from 'react-redux'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getLoading } from 'selectors/google-auth-success'
import SpinnerStyled from 'components/ui/spinner'
import Redirect from 'react-router-dom/es/Redirect'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const isLoading = useShallowEqualSelector(getLoading)

  const state = useMemo(() => searchParams.get('state'), [])

  const url = window.location.href.replace('http', 'https')

  useEffect(() => {
    dispatch(
      getUsersHoursTokenRequest({
        state,
        callback_url: url,
      })
    )
  }, [])

  if (!state) <Redirect to="/timereport" />

  return isLoading ? <SpinnerStyled /> : <div>hello sucess</div>
}
