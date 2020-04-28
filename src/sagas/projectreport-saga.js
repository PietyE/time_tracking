import { call, takeEvery, put, select } from 'redux-saga/effects'
import Api from 'utils/api'

import {
  GET_DEV_CONSOLIDATE_PROJECT_REPORT,
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
} from 'constants/actions-constant'
import { setDeveloperConsolidateProjectReport } from 'actions/projects-report'

export function* getDeveloperConsolidateProgectReport({ payload = {} }) {
  const { month, year } = yield select(
    (state) => state.projectsReport.selectedDate
  )

  const { email = '' } = yield select(
    (state) => state.projectsReport.selectedDeveloper
  )

  const { name = '' } = yield select(
    (state) => state.projectsReport.selectedProject
  )

  const searchParam = `${email} ${name}`
  const URL_DEVELOPER_PROJECT = `developer-projects/consolidated-report-by-user/${year}/${
    month + 1
  }/?search=${searchParam}`
  const { data } = yield call(
    [Api, 'consolidateReportApi'],
    URL_DEVELOPER_PROJECT
  )
  if (data) {
    yield put(setDeveloperConsolidateProjectReport(data))
  }
}

export function* watchDeveloperProjects() {
  yield takeEvery(
    [
      GET_DEV_CONSOLIDATE_PROJECT_REPORT,
      CHANGE_SELECTED_DATE_PROJECTS_REPORT,
      SET_SELECTED_DEVELOPER,
      CLEAR_SELECTED_DEVELOPER,
      SET_SELECTED_PROJECT_PROJECTREPORTS,
      CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
    ],
    getDeveloperConsolidateProgectReport
  )
}
