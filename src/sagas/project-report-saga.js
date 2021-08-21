import { call, put, select, takeEvery } from 'redux-saga/effects'
import Api from '../utils/api'
import { GET_CONSOLIDATE_PROJECT_REPORT } from '../constants/actions-constant'
import { setConsolidateProjectReport } from '../actions/projects-report'
import { consolidateReportMapper } from '../utils/projectReportApiResponseMapper'


export function* handleGetConsolidatedReport() {
  const { month, year } = yield select(
    (state) => state.projectsReport.selectedDate
  )
// console.dir(month);
//   console.dir(year);
  const URL_CONSOLIDATED_LIST_REPORT = `users/consolidated-report/${year}/${
    month + 1
  }/`
  const response = yield call([Api, 'getConsolidatedReport'], URL_CONSOLIDATED_LIST_REPORT)
  const mapperResponse = consolidateReportMapper(response)
  yield put(setConsolidateProjectReport(mapperResponse))
}




export function* watchNewConsolidatedReport() {
  yield takeEvery(GET_CONSOLIDATE_PROJECT_REPORT, handleGetConsolidatedReport)
}