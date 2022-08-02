import React, { useEffect } from 'react'
import { useSearchParams } from 'utils/useSearchParams'
import { useDispatch } from 'react-redux'
import { GET_USERS_HOURS_TOKEN_REQUEST } from 'constants/google-auth-sucess-constants'

export const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()

  const state = searchParams.get('state')

  useEffect(() => {
    // dispatch(GET_USERS_HOURS_TOKEN_REQUEST(state))
  }, [])

  return <div>hello sucess</div>
}
