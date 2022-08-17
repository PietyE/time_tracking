import { select, call, takeEvery, put } from 'redux-saga/effects'
import { isEmpty, cloneDeep } from 'lodash'
import Api from 'utils/api'
import { pm } from '../api'
import { SUCCES_ALERT, WARNING_ALERT } from 'constants/alert-constant'
import { saveAs } from 'file-saver'
import {
  CHANGE_SELECTED_DATE_TIME_REPORT,
  ADD_TIME_REPORT,
  SELECT_PROJECT,
  GET_DEVELOPER_PROJECTS,
  GET_DEVELOPER_PROJECTS_BY_ID,
  DELETE_TIME_REPORT,
  EDIT_TIME_REPORT,
  GET_PROJECTS,
  GET_DEVELOPERS,
  SELECT_DEVELOPERS,
  GET_TIME_REPORT_CSV,
} from 'constants/actions-constant'
import { DEVELOPER } from 'constants/role-constant'
import {
  setTimeReports,
  setIsFetchingReports,
  setEditMode,
  selectProject,
} from 'actions/times-report'
import { setDeveloperProjects } from 'actions/developer-projects'
import { setDeveloperProjectsTR } from 'actions/times-report'
import { showAlert } from 'actions/alert'
import { setDevelopers } from 'actions/developers'

export function* getDeveloperProjects({ projectIdForSelect = null }) {
  const { role } = yield select((state) => state.profile)

  let URL_DEVELOPER_PROJECT = 'developer-projects/'

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

export function* getDeveloperProjectsById(action) {
  const { month, year } = yield select(
    (state) => state.timereports.selectedDate
  )
  try {
    let developerId = action?.payload
    const { data } = yield call([pm, 'getDeveloperProjectsById'], {
      year,
      month,
      id: `${developerId}`,
    })
    yield put(setDeveloperProjectsTR(data))
  } catch (error) {
    yield put(
      showAlert({
        type: WARNING_ALERT,
        title: 'Something went wrong',
        message: error.message || 'Something went wrong',
        delay: 6000,
      })
    )
  }
}

export function* getProjects() {
  const URL_PROJECT = 'projects/'
  const { data } = yield call([Api, 'developerProjects'], URL_PROJECT)
  yield put(setDeveloperProjects(data))
  yield call(getDevelopers)
}

export function* getDevelopers() {
  const URL_USERS = 'users/'
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
  } catch (e) {}
}

export function* addTimeReport({ payload }) {
  try {
    yield put(setIsFetchingReports(true))

    const { selectedProject } = yield select((state) => state.timereports)

    const URL_WORK_ITEMS = 'work_items/'
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
  } finally {
    yield put(setIsFetchingReports(false))
  }
}

export function* deleteTimeReport({ payload: id }) {
  yield put(setIsFetchingReports(true))

  const URL = `work_items/${id}/`
  const {
    reports: { items },
  } = yield select((state) => state.timereports)
  const newTimereport = items.filter((item) => item.id !== id)
  const { status } = yield call([Api, 'deleteWorkItem'], URL)
  yield put(setIsFetchingReports(false))

  if (status === 204) {
    yield put(setTimeReports({ items: newTimereport }))
    yield put(
      showAlert({
        type: SUCCES_ALERT,
        message: 'The report has been deleted!',
        delay: 5000,
      })
    )
  }
}

export function* editTimeReport({ payload }) {
  yield put(setIsFetchingReports(true))

  try {
    const {
      reports: { items = [] },
    } = yield select((state) => state.timereports)
    const newItems = cloneDeep(items)
    const { id, ...body } = payload
    const URL = `work_items/${id}/`
    const { data, status } = yield call([Api, 'editWorkItem'], URL, body)

    if (status >= 400) {
      yield put(setIsFetchingReports(false))
      return
    }

    if (data) {
      if (
        items.some((i) => i.developer_project !== payload.developer_project)
      ) {
        yield call(workerTimeReports)
      } else {
        const indexEdited = newItems.findIndex((item) => item.id === data.id)
        newItems.splice(indexEdited, 1, data)
        yield put(setTimeReports({ items: newItems }))
      }
      yield put(setIsFetchingReports(false))

      yield put(
        showAlert({
          type: SUCCES_ALERT,
          message: 'The report has been edited!',
          delay: 5000,
        })
      )
    }
  } catch (e) {}
}

export function* downloadCSV() {
  try {
    const { selectedDate, selectedProject } = yield select(
      (state) => state.timereports
    )
    const URL = `developer-projects/${
      selectedProject.developer_project_id
    }/export-excel/${selectedDate.year}/${selectedDate.month + 1}/`
    const res = yield call([Api, 'exportCsv'], URL)
    const fileName = res.headers['content-disposition'].split('"')[1]
    if (res && res.data instanceof Blob) {
      saveAs(res.data, fileName)
    }
  } catch (error) {
    //to do
  }
}

export function* watchTimereports() {
  yield takeEvery(
    [GET_DEVELOPER_PROJECTS, SELECT_DEVELOPERS],
    getDeveloperProjects
  )
  yield takeEvery(GET_PROJECTS, getProjects)
  yield takeEvery(GET_DEVELOPER_PROJECTS_BY_ID, getDeveloperProjectsById)
  yield takeEvery(GET_DEVELOPERS, getDevelopers)
  yield takeEvery(ADD_TIME_REPORT, addTimeReport)
  yield takeEvery(DELETE_TIME_REPORT, deleteTimeReport)
  yield takeEvery(EDIT_TIME_REPORT, editTimeReport)
  yield takeEvery(
    [SELECT_PROJECT, CHANGE_SELECTED_DATE_TIME_REPORT],
    workerTimeReports
  )
  yield takeEvery(GET_TIME_REPORT_CSV, downloadCSV)
}
