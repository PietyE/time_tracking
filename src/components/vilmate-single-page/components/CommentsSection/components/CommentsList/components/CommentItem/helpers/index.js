import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { get as lodashGet } from 'lodash'
import { showAlert } from 'actions/alert'
import { WARNING_ALERT } from 'constants/alert-constant'
import Api from 'utils/api'

export const useFetchUserName = (userId) => {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const url = `users/${userId}/`

  const getUserById = async () => {
    try {
      const response = await Api.users(url)
      const { status, data } = response
      if (String(status)[0] !== '2') {
        throw new Error()
      }
      setUser(data)
    } catch (error) {
      dispatch(
        showAlert({
          type: WARNING_ALERT,
          title: 'User has not loaded',
          message: error.message || 'Something went wrong',
          delay: 3000,
        })
      )
    }
  }

  useEffect(() => {
    if (userId) getUserById()
  }, [])

  return lodashGet(user, 'name', 'DELETED')
}
