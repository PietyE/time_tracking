import axios from 'axios'

import { BASE_URL } from 'constants/url-constant'
import { getTokenKeyFromLocalStorage } from './common'

export const fetchApi = async ({
  url,
  body = null,
  method = 'get',
  customHeaders,
  authenticated = true,
  ...rest
}) => {
  let headers = {
    'Content-Type': 'application/json',
  }

  const URL = `${BASE_URL}/${url}`;
  // const URL = `/${url}`
  const data = body

  if (authenticated) {
    const token = getTokenKeyFromLocalStorage()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  if (customHeaders) {
    headers = { ...headers, ...customHeaders }
  }
  const options = {
    url: URL,
    method,
    headers,
    data,
    // timeout: 10000,
    ...rest,
  }

  const response = await axios(options)

  return response
}
