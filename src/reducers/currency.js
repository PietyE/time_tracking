import {
  GET_CURRENCIES_LIST,
  SET_SUCCESS_CURRENCIES_LIST,
  SET_ERROR_CURRENCIES_LIST,
  GET_RATES_LIST, SET_SUCCESS_RATES_LIST,
} from '../constants/actions-constant'

const initialState = {
  currenciesList: [],
  ratesList: [],
  isFetchingCurrenciesList: false,
  isFetchingRatesList: false,
  errorFetchCurrenciesList: false,
  errorFetchRatesList: false,
  successFetchCurrenciesList: false,
  successFetchRatesList: false,
}

export const currencyList = (state = initialState, action) => {
  // console.dir(action);
  switch (action.type) {
    case GET_CURRENCIES_LIST:
      return { ...state, isFetchingCurrenciesList: true }
    case SET_SUCCESS_CURRENCIES_LIST:
      return {
        ...state,
        isFetchingCurrenciesList: false,
        successFetchCurrenciesList: true,
        currenciesList: action.payload
      }
    case SET_ERROR_CURRENCIES_LIST:
      return { ...state,
        errorFetchCurrenciesList: true,
        isFetchingCurrenciesList: false,
        successFetchCurrenciesList: false,
      }
    case GET_RATES_LIST:
      return { ...state, isFetchingRatesList: true }
    case SET_SUCCESS_RATES_LIST:
      return {
        ...state,
        isFetchingRatesList: false,
        successFetchRatesList: true,
        ratesList: action.payload
      }
    default:
      return state
  }
}