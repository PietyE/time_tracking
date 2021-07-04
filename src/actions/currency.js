import { GET_CURRENCIES_LIST, SET_CURRENCIES_LIST} from 'constants/actions-constant'


export const getCurrenciesList = (payload) => ({
  type: GET_CURRENCIES_LIST,
  payload,
})

export const setSuccessCurrenciesList = (payload) => ({
  type: SET_CURRENCIES_LIST,
  payload,
})