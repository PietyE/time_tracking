import {
  GET_CURRENCIES_LIST, GET_RATES_LIST,
  SET_ERROR_CURRENCIES_LIST, SET_ERROR_RATES_LIST,
  SET_SUCCESS_CURRENCIES_LIST, SET_SUCCESS_RATES_LIST,
} from 'constants/actions-constant'


export const getCurrenciesList = (payload) => ({
  type: GET_CURRENCIES_LIST,
  payload,
})

export const setSuccessCurrenciesList = (payload) => ({
  type: SET_SUCCESS_CURRENCIES_LIST,
  payload,
})

export const setErrorCurrenciesList = () => ({
  type: SET_ERROR_CURRENCIES_LIST,
 })

export const getRatesList = (payload) => ({
  type: GET_RATES_LIST,
  payload,
})

export const setSuccessRatesList = (payload) => ({
  type: SET_SUCCESS_RATES_LIST,
  payload,
})

export const setErrorRatesList = () => ({
  type: SET_ERROR_RATES_LIST,
})