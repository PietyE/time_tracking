import { call, takeEvery, put } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  GET_CURRENCIES_LIST,
  GET_RATES_LIST,
} from 'constants/actions-constant'
import {
  setErrorCurrenciesList,
  setErrorRatesList,
  setSuccessCurrenciesList,
  setSuccessRatesList,
} from 'actions/currency'
import { currencyListMapper, ratesListMapper } from '../utils/currencyApiResponseMapper'


export function* handleGetCurrenciesList() {
  try {
    const URL_CURRENCIES_LIST = 'currencies/'
    const response = yield call([Api, 'getCurrenciesList'], URL_CURRENCIES_LIST)
    const mapperResponse = currencyListMapper(response);
    yield put(setSuccessCurrenciesList(mapperResponse))
  } catch (error) {
    yield put (setErrorCurrenciesList())
  }
}

export function* handleGetRatesList() {
  try {
    const URL_RATES_LIST = 'exchange_rates/'
    const response = yield call([Api, 'getRatesList'], URL_RATES_LIST)
    const mapperResponse = ratesListMapper(response);
    console.dir(mapperResponse);
    yield put(setSuccessRatesList(mapperResponse))
  } catch (error) {
    yield put (setErrorRatesList())
  }
}

export function* watchCurrencies() {
  yield takeEvery(GET_CURRENCIES_LIST, handleGetCurrenciesList)
  yield takeEvery(GET_RATES_LIST, handleGetRatesList)
}

