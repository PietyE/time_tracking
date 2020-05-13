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
  SELECT_DEVELOPERS,
} from 'constants/actions-constant'
import { DEVELOPER } from 'constants/role-constant'
import {
  setTimeReports,
  setIsFetchingReports,
  setEditMode,
  selectProject,
} from 'actions/times-report'
import { setDeveloperProjects } from 'actions/developer-projects'
import { showAler } from 'actions/alert'
import { setDevelopers } from 'actions/developers'

export function* getDeveloperProjects({ payload, projectIdForSelect = null }) {
  const { role } = yield select((state) => state.profile)

  let URL_DEVELOPER_PROJECT = `developer-projects/`

  if (role !== DEVELOPER) {
    const { id } = yield select((state) => state.timereports.selectedDeveloper)
    URL_DEVELOPER_PROJECT = `developer-projects/?user_id=${id}`
  }

  const { data } = yield call([Api, 'developerProjects'], URL_DEVELOPER_PROJECT)

  const restructureData = data.map((item) => ({
    ...item.project,
    developer_project_id: item.id,
  }))

  yield put(setDeveloperProjects(restructureData))
  if (role !== DEVELOPER) {
    yield call(getDevelopers)
    if (projectIdForSelect) {
      const { developerProjects } = yield select((state) => state)
      if (developerProjects.length) {
        const routeProject = developerProjects.find(
          (project) => projectIdForSelect === project.developer_project_id
        )
        yield put(selectProject(routeProject))
      }
    }
  }
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
  yield put(setDevelopers(data))
}

export function* workerTimeReports() {
  try {
    const { selectedProject, selectedDate, idEditingWorkItem } = yield select(
      (state) => state.timereports
    )
    if (!isEmpty(selectedProject)) {
      const { developer_project_id } = selectedProject
      const { year, month } = selectedDate
      const searchString = `?developer_project=${developer_project_id}&year=${year}&month=${
        1 + month
      }`
      const URL_WORK_ITEMS = `work_items/${searchString}`
      yield put(setIsFetchingReports(true))

      const { data } = yield call([Api, 'getWorkItems'], URL_WORK_ITEMS)

      yield put(setTimeReports(data))
      if (idEditingWorkItem) {
        yield put(setEditMode(null))
      }

      yield put(setIsFetchingReports(false))
    }
  } catch (error) {}
}

export function* addTimeReport({ payload }) {
  const { selectedProject } = yield select((state) => state.timereports)

  const URL_WORK_ITEMS = `work_items/`
  const { reports } = yield select((state) => state.timereports)
  const newTimereport = [...reports.items]

  const body = {
    id: selectedProject.id,
    developer_project: selectedProject.developer_project_id,
    title: payload.description,
    duration: payload.tookHours,
    date: payload.date,
  }

  const { data, status } = yield call(
    [Api, 'addWorkItem'],
    URL_WORK_ITEMS,
    body
  )

  if (status >= 400) {
    return
  }

  newTimereport.unshift({
    id: data.id,
    title: data.title,
    duration: data.duration,
    date: data.date,
  })

  yield put(setTimeReports({ items: newTimereport }))
}

export function* deleteTimeReport({ payload: id }) {
  const URL = `work_items/${id}/`
  const {
    reports: { items },
  } = yield select((state) => state.timereports)
  const newTimereport = items.filter((item) => item.id !== id)
  const { status } = yield call([Api, 'deleteWorkItem'], URL)
  if (status === 204) {
    yield put(setTimeReports({ items: newTimereport }))
    yield put(
      showAler({
        type: SUCCES_ALERT,
        message: 'The report has been deleted!',
        delay: 5000,
      })
    )
  }
}

export function* editTimeReport({ payload }) {
  try {
    const {
      reports: { items = [] },
    } = yield select((state) => state.timereports)
    const newItems = [...items]
    const { id, ...body } = payload
    const URL = `work_items/${id}/`
    const { data, status } = yield call([Api, 'editWorkItem'], URL, body)

    if (status >= 400) {
      return
    }

    if (data) {
      const indexEdited = newItems.findIndex((item) => item.id === data.id)
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
  yield takeEvery(
    [GET_DEVELOPER_PROJECTS, SELECT_DEVELOPERS],
    getDeveloperProjects
  )
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
