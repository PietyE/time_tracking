import { select, call, takeEvery, put } from 'redux-saga/effects'
import { isEmpty } from 'lodash'
import Api from 'utils/api'
import { SUCCES_ALERT } from 'constants/alert-constant'
import {
  CHANGE_SELECTED_DATE_TIME_REPORT,
  ADD_TIME_REPORT,
  SELECT_PROJECT,
  GET_DEVELOPER_PROJECTS,
  DELETE_TIME_REPORT,
  EDIT_TIME_REPORT,
  GET_PROJECTS,
  GET_DEVELOPERS,
} from 'constants/actions-constant'
import { setTimeReports, setIsFetchingReports } from 'actions/times-report'
import { setDeveloperProjects } from 'actions/developer-projects'
import { showAler } from 'actions/alert'
import { setDevelopers } from 'actions/developers'

export function* getDeveloperProjects() {
  const URL_DEVELOPER_PROJECT = `developer-projects/`
  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)
  const restructureData = data.map(item => ({
    ...item.project,
    developer_project_id: item.id,
  }))
  yield put(setDeveloperProjects(restructureData))
}

export function* getProjects() {
  const URL_PROJECT = `projects/`
  const { data } = yield call([Api, 'developerProjects'], URL_PROJECT)
  yield put(setDeveloperProjects(data))
  yield call(getDevelopers)
}

export function* getDevelopers() {
  const URL_USERS = `users/`
  const { data } = yield call([Api, 'developerProjects'], URL_USERS)
  console.log('data', data)
  yield put(setDevelopers(data))
}

export function* workerTimeReports() {
  try {
    const { selectedProject, selectedDate } = yield select(
      state => state.timereports
    )
    if (!isEmpty(selectedProject)) {
      const { developer_project_id } = selectedProject
      const { year, month } = selectedDate
      const searchString = `?developer_project=${developer_project_id}&year=${year}&month=${1 +
        month}`
      const URL_WORK_ITEMS = `work_items/${searchString}`
      yield put(setIsFetchingReports(true))

      const { data } = yield call([Api, 'getWorkItems'], URL_WORK_ITEMS)

      yield put(setTimeReports(data))
      yield put(setIsFetchingReports(false))
    }
  } catch (error) {}
}

export function* addTimeReport({ payload }) {
  const { selectedProject, selectedDate } = yield select(
    state => state.timereports
  )

  const URL_WORK_ITEMS = `work_items/`
  const { reports } = yield select(state => state.timereports)
  const newTimereport = [...reports.items]

  const body = {
    id: selectedProject.id,
    developer_project: selectedProject.developer_project_id,
    title: payload.description,
    duration: payload.tookHours,
    date: payload.date,
  }

  const { data } = yield call([Api, 'addWorkItem'], URL_WORK_ITEMS, body)

  newTimereport.push({
    id: data.id,
    title: data.title,
    duration: data.duration,
    date: data.date,
  })

  yield put(setTimeReports({ items: newTimereport }))
}

export function* deleteTimeReport({ payload: id }) {
  const URL = `work_items/${id}`
  const {
    reports: { items },
  } = yield select(state => state.timereports)
  const newTimereport = items.filter(item => item.id !== id)
  const { status } = yield call([Api, 'deleteWorkItem'], URL)
  if (status === 204) {
    yield put(setTimeReports({ items: newTimereport }))
  }
}

export function* editTimeReport({ payload }) {
  try {
    const {
      reports: { items = [] },
    } = yield select(state => state.timereports)
    const newItems = [...items]
    const { id, ...body } = payload
    const URL = `work_items/${id}`
    const { data } = yield call([Api, 'editWorkItem'], URL, body)

    if (data) {
      const indexEdited = newItems.findIndex(item => item.id === data.id)
      newItems.splice(indexEdited, 1, data)
      yield put(setTimeReports({ items: newItems }))
      yield put(
        showAler({
          type: SUCCES_ALERT,
          message: 'The report has been edited!',
          delay: 5000,
        })
      )
    }
  } catch (error) {
    console.dir(error)
  }
}

export function* watchTimereports() {
  yield takeEvery(GET_DEVELOPER_PROJECTS, getDeveloperProjects)
  yield takeEvery(GET_PROJECTS, getProjects)
  yield takeEvery(GET_DEVELOPERS, getDevelopers)
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(DELETE_TIME_REPORT, deleteTimeReport)
  yield takeEvery(EDIT_TIME_REPORT, editTimeReport)
  yield takeEvery(
    [SELECT_PROJECT, CHANGE_SELECTED_DATE_TIME_REPORT],
    workerTimeReports
  )
}
