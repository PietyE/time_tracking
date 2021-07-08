import { call, takeEvery, put } from 'redux-saga/effects'
import Api from 'utils/api'
import {
  GET_CURRENCIES_LIST, GET_RATES_LIST,
  SET_ERROR_CURRENCIES_LIST, SET_ERROR_RATES_LIST,
  SET_SUCCESS_CURRENCIES_LIST, SET_SUCCESS_RATES_LIST,
} from 'constants/actions-constant'
import {
  setErrorCurrenciesList,
  setErrorRatesList,
  setSuccessCurrenciesList,
  setSuccessRatesList,
} from 'actions/currency'
import { currencyListMapper, ratesListMapper } from '../utils/currencyApiResponseMapper'


export function* getCurrenciesList() {
  try {
    const URL_CURRENCIES_LIST = `currencies/`
    const response = yield call([Api, 'getCurrenciesList'], URL_CURRENCIES_LIST)
    const mapperResponse = currencyListMapper(response);
    yield put(setSuccessCurrenciesList(mapperResponse))
  } catch (error) {
    yield put (setErrorCurrenciesList)
  }
}

export function* getRatesList() {
  try {
    const URL_RATES_LIST = `exchange_rates/`
    const response = yield call([Api, 'getRatesList'], URL_RATES_LIST)
    const mapperResponse = ratesListMapper(response);
    console.dir(mapperResponse);
    yield put(setSuccessRatesList(mapperResponse))
  } catch (error) {
    yield put (setErrorRatesList)
  }
}

export function* watchCurrencies() {
  yield takeEvery(GET_CURRENCIES_LIST, getCurrenciesList)
  yield takeEvery(SET_SUCCESS_CURRENCIES_LIST, setSuccessCurrenciesList)
  yield takeEvery(SET_ERROR_CURRENCIES_LIST, setErrorCurrenciesList)
  yield takeEvery(GET_RATES_LIST, getRatesList)
  yield takeEvery(SET_SUCCESS_RATES_LIST, setSuccessRatesList)
  yield takeEvery(SET_ERROR_RATES_LIST, setErrorRatesList)
}

