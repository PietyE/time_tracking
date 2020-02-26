import { put, call, takeEvery } from 'redux-saga/effects'

import { LOCATION_PROCESSING } from 'constants/actions-constant'

import { changeSelectedDate } from 'actions/timereports'
import { selectProject } from 'actions/developer-projects'

function* processingWorker({ payload }) {
  try {
    const { pathname, search } = payload
    const parsePathName = pathname
      .split('/')
      .join('')
      .trim()
    function parseQuery(queryString) {
      var query = {}
      var pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
      ).split('&')
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=')
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
      }
      return query
    }
    console.log(parseQuery(search))
    switch (parsePathName) {
      case 'timereport':
        const { developer_project, year, month } = parseQuery(search)
        if (year && month && month < 13 && month > 0) {
          yield put(changeSelectedDate({ year, month: month - 1 }))
        }
        if (developer_project) {
          yield put(selectProject({ developer_project_id: developer_project }))
        }
        break

      default:
        break
    }
  } catch (error) {}
}

export function* processingWatcher() {
  yield takeEvery(LOCATION_PROCESSING, processingWorker)
}
