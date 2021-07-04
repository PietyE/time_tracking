import { GET_CURRENCIES_LIST, SET_CURRENCIES_LIST } from '../constants/actions-constant'

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

export const currency = (state = initialState, action) => {
  console.dir(action);
  switch (action.type) {
    case GET_CURRENCIES_LIST:
      return { ...state, isFetchingCurrenciesList: true }
    case SET_CURRENCIES_LIST:
      return {
        ...state,
        isFetchingCurrenciesList: false,
        successFetchCurrenciesList: true,
        currenciesList: action.payload.data
      }
    default:
      return state
  }
}