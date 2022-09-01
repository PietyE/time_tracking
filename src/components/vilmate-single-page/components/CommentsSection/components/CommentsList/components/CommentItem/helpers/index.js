import { useEffect, useState } from 'react'
import axios from 'axios'
import { get as lodashGet } from 'lodash'

export const useFetchUserName = (userId) => {
  const [user, setUser] = useState('')
  const url = `/users/${userId}/`

  useEffect(() => {
    axios.get(url).then((response) => setUser(response.data))
  }, [])

  return lodashGet(user, 'name', 'Anonymous')
}
