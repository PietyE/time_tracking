import { call, takeEvery, put } from 'redux-saga/effects'
import Api from 'utils/api'
import { GET_CURRENCIES_LIST, SET_CURRENCIES_LIST } from 'constants/actions-constant'
import {  setSuccessCurrenciesList } from 'actions/currency'


export function* getCurrenciesList() {
  try {
    const URL_CURRENCIES_LIST = `currencies/`
    const currency = yield call([Api, 'getCurrenciesList'], URL_CURRENCIES_LIST)
    yield put(setSuccessCurrenciesList(currency))
  } catch  {

  }
}

export function* watchCurrencies() {
  yield takeEvery(GET_CURRENCIES_LIST, getCurrenciesList)
  yield takeEvery(SET_CURRENCIES_LIST, setSuccessCurrenciesList)
}