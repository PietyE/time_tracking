import { call, takeEvery, put } from 'redux-saga/effects'
import Api from 'utils/api'
import { GET_CURRENCIES_LIST, GET_RATES_LIST } from 'constants/actions-constant'
import {
  setErrorCurrenciesList,
  setErrorRatesList,
  setSuccessCurrenciesList,
  setSuccessRatesList,
} from 'actions/currency'
import {
  currencyListMapper,
  ratesListMapper,
} from 'utils/currencyApiResponseMapper'

export function* handleGetCurrenciesList() {
  try {
    const URL_CURRENCIES_LIST = 'currencies/'
    const response = yield call([Api, 'getCurrenciesList'], URL_CURRENCIES_LIST)
    const status = `${response.status}`
    if (status[0] !== '2') {
      throw new Error()
    }
    const mapperResponse = currencyListMapper(response)
    yield put(setSuccessCurrenciesList(mapperResponse))
  } catch (error) {
    yield put(setErrorCurrenciesList())
  }
}

export function* handleGetRatesList({ payload }) {
  try {
    const URL_RATES_LIST = 'exchange_rates/'
    const response = yield call([Api, 'getRatesList'], URL_RATES_LIST, payload)
    const status = `${response.status}`
    if (status[0] !== '2') {
      throw new Error()
    }
    const mapperResponse = ratesListMapper(response)
    yield put(setSuccessRatesList(mapperResponse))
  } catch (error) {
    yield put(setErrorRatesList())
  }
}

export function* watchCurrencies() {
  yield takeEvery(GET_CURRENCIES_LIST, handleGetCurrenciesList)
  yield takeEvery(GET_RATES_LIST, handleGetRatesList)
}
