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

    return await axios(options)
  } catch (error) {
    const { response = {}, message: error_message } = error

    const { data = {}, status, statusText } = response

    const { detail, title, non_field_errors, duration } = data

    const currentTitle = title && title[0]
    const currentNonFieldError = non_field_errors && non_field_errors[0]
    const errorData = {
      status,
      messages: currentTitle || duration || currentNonFieldError || error_message || statusText ,
      detail: typeof data === 'object' ? detail : '',
    }

    store.dispatch(setErrorData(errorData))
    return response
  }
}
