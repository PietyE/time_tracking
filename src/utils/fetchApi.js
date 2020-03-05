import axios from 'axios'

import store from 'store'
import { BASE_URL } from 'constants/url-constant'
import { getTokenKeyFromLocalStorage } from './common'
import { setErrorData } from 'actions/error'

export const fetchApi = async ({
  url,
  body = null,
  method = 'get',
  customHeaders,
  authenticated = true,
  ...rest
}) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }

    const URL = `${BASE_URL}/${url}`

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
      ...rest,
    }

    const response = await axios(options)
    return response
  } catch (error) {
    const { response = {}, message: error_message } = error

    const { data = {}, status, statusText } = response
    const { detail, title } = data

    const errorData = {
      status,
      messages: (title && title[0]) || error_message || statusText,
      detail: typeof data === 'object' ? detail : '',
    }

    store.dispatch(setErrorData(errorData))
    return response
  }
}
