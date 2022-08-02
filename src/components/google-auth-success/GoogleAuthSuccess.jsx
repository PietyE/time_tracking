import React, { useEffect } from 'react'
import { useSearchParams } from 'utils/useSearchParams'
import { useDispatch } from 'react-redux'
import { getUsersHoursTokenRequest } from 'actions/google-auth-success'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  useEffect(() => {
    const google_auth_url = localStorage.getItem('google_auth_url')
    dispatch(
      getUsersHoursTokenRequest({
        google_auth_url,
        state,
      })
    )
  }, [])

  return <div>hello sucess</div>
}
