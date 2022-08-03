import React, { useEffect } from 'react'
import { useSearchParams } from 'utils/useSearchParams'
import { useDispatch } from 'react-redux'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getLoading } from 'selectors/google-auth-success'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const isLoading = useShallowEqualSelector(getLoading)

  const state = searchParams.get('state')

  const url = window.location.href.replace('http', 'https')

  useEffect(() => {
    dispatch(
      getUsersHoursTokenRequest({
        state,
        callback_url: url,
      })
    )
  }, [])

  return <div>hello sucess</div>
}
