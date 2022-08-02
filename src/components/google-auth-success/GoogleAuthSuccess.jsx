import React, { useEffect } from 'react'
import { useSearchParams } from 'utils/useSearchParams'
import { useDispatch } from 'react-redux'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  const url = window.location.href.replace('http', 'https')

  useEffect(() => {
    dispatch(
      getUsersHoursTokenRequest({
        google_auth_url: url,
        state,
      })
    )
  }, [])

  return <div>hello sucess</div>
}
