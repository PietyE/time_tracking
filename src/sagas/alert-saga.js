import {
  put,
  delay,
  select,
  actionChannel,
  take,
  call,
} from 'redux-saga/effects'

import { startShowAlert, hideAlert, setMessage } from 'actions/alert'
import { SHOW_ALERT } from 'constants/actions-constant'

export function* showAlert(data) {
  console.log(data);
  yield put(setMessage(data))
  const delayMS = yield select(state => state.alert.delay)
  yield put(startShowAlert())
  yield delay(delayMS)
  yield put(hideAlert())
}

export function* watchshowAlert() {
  const requestChan = yield actionChannel(SHOW_ALERT)
  while (true) {
    const { payload } = yield take(requestChan)
    yield call(showAlert, payload)
  }
}
