import {
  CLEAR_PM_PAGE,
  CLEAR_PM_PROJECTS,
  GET_ACTIVE_PROJECTS,
  SET_ALL_PROJECTS,
  SET_IS_FETCHING_PM_PAGE,
  SET_PROJECT_REPORTS,
  SET_SELECTED_PM,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROJECT_ID,
  SET_SHOW_CREATE_MODAL,
  SET_SHOW_CREATE_USER_MODAL,
  SET_SHOW_EDIT_MODAL,
  SET_SHOWN_PROJECT,
} from 'constants/actions-constant'
import { getUserPermissions } from '../selectors/user'
import { userPermissions } from '../constants/permissions'

const todayDate = new Date()

const initialState = {
  selectedDateForPM: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  projects: [],
  activeProjects: [],
  archiveProjects: [],
  projectsWithReports: [],
  selectedProjectId: '',
  selectedProject: {},
  isFetchingPmPage: false,
  isShowEditModal: false,
  isShowCreateModal: false,
  isShowCreateUserModal: false,
  selectedPm: {
    email: '',
    id: 'select-all',
    name: 'Choose PM',
  },
  shownProject: null,
  currentOwner: '',
}
const setProjectsWithReports = (state, action) => {
  let projectsWithReports = []
  const index = state.projectsWithReports.findIndex(
    (el) => el.projectId === action.payload.projectId
  )
  if (index === -1) {
    projectsWithReports = [...state.projectsWithReports, action.payload]
  } else {
    projectsWithReports = [...state.projectsWithReports]
    projectsWithReports[index] = action.payload
  }
  return { ...state, projectsWithReports }
}

export const projectsManagement = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PROJECTS:
      return { ...state, projects: action.payload }
    case SET_PROJECT_REPORTS:
      return setProjectsWithReports(state, action)
    case SET_SELECTED_PROJECT_ID:
      return { ...state, selectedProjectId: action.payload }
    case SET_SELECTED_PROJECT:
      return { ...state, selectedProject: action.payload }
    case CLEAR_PM_PROJECTS:
      return { ...state, projectsWithReports: [] }
    case SET_IS_FETCHING_PM_PAGE:
      return { ...state, isFetchingPmPage: action.payload }
    case SET_SHOW_EDIT_MODAL:
      return { ...state, isShowEditModal: action.payload }
    case SET_SHOW_CREATE_MODAL:
      return { ...state, isShowCreateModal: action.payload }
    case SET_SHOW_CREATE_USER_MODAL:
      return { ...state, isShowCreateUserModal: action.payload }
    case SET_SELECTED_PM:
      return { ...state, selectedPm: action.payload }
    case SET_SHOWN_PROJECT:
      return { ...state, shownProject: action.payload }
    case GET_ACTIVE_PROJECTS:
      return { ...state, activeProjects: action.payload }
    case CLEAR_PM_PAGE:
      return { ...initialState }
    default:
      return state
  }
}

export const getSelectedPmSelector = (state) =>
  state.projectsManagement.selectedPm
export const getSelectedPmIdSelector = (state) =>
  state.projectsManagement.selectedPm?.id

export const getIsFetchingPmPageSelector = (state) =>
  state.projectsManagement.isFetchingPmPage
export const getIsShowEditModalSelector = (state) =>
  state.projectsManagement.isShowEditModal
export const getIsShowCreateModalSelector = (state) =>
  state.projectsManagement.isShowCreateModal
export const getIsShowCreateUserModalSelector = (state) =>
  state.projectsManagement.isShowCreateUserModal

export const getUsersSelector = (state) => state.developers.developersList

export const getProjectManagerListSelector = (state) => {
  const users = getUsersSelector(state)
  const permissions = getUserPermissions(state)
  return users.filter(
    (user) =>
      user.role === 4 ||
      permissions?.includes(userPermissions.projects_view_project)
  )
}

export const getDeveloperSelector = (state) => {
  const users = getUsersSelector(state)
  const permissions = getUserPermissions(state)
  //todo: ask
  return users.filter(
    (user) =>
      user.role === 1 ||
      permissions?.includes(userPermissions.projects_view_developerproject)
  )
}
///////////////////////////////////////////////////////

export const getSelectedMonthForPMSelector = (state) =>
  state.projectsManagement.selectedDateForPM.month
///////////////////////////////////////////////////////
export const getAllProjectsSelector = (state) =>
  state.projectsManagement.projects

export const getShownProjectSelector = (state) =>
  state.projectsManagement.shownProject

export const getFilteredProjectSelector = (state) => {
  const allProjects = getAllProjectsSelector(state)
  const selectedProject = getShownProjectSelector(state)

  return allProjects.filter((project) => {
    if (!selectedProject?.id) return true
    return project.id === selectedProject.id
  })
}

export const getProjectsWithReportSelector = (state) =>
  state.projectsManagement.projectsWithReports

export const getProjectReportByIdSelector = (state, id) => {
  return getProjectsWithReportSelector(state).find(
    (project) => project.projectId === id
  )
}
export const getSelectedProjectIdSelector = (state) =>
  state.projectsManagement.selectedProjectId
export const getSelectedProjectSelector = (state) =>
  state.projectsManagement.selectedProject
export const getCurrentProjectSelector = (state) => {
  const id = getSelectedProjectIdSelector(state)
  const projects = getAllProjectsSelector(state)

  let currentProject = projects.find((project) => project.id === id)

  return currentProject
}
///////////////////////////////////////////////////////

export const getProjectName = (state) => {
  const currentProject = getCurrentProjectSelector(state)
  return currentProject?.name
}
///////////////////////////////////////////////////////
export const getProjectActiveUsersSelector = (state) => {
  const projectId = getSelectedProjectIdSelector(state)
  const reports = getProjectsWithReportSelector(state)
  const currentProjectReports = reports.find(
    (rep) => rep.projectId === projectId
  )
  return currentProjectReports?.users?.map((report) => ({
    user_id: report.userId,
    name: report.userName,
    is_full_time: report?.is_full_time,
    is_active: report?.is_active,
    projectReportId: report?.projectReportId,
    is_project_manager: report?.is_project_manager,
  }))
}

export const getActiveProjectManagerSelector = (state) => {
  const projectActiveUsers = getProjectActiveUsersSelector(state)
  const allProjectManagers = getProjectManagerListSelector(state)

  if (projectActiveUsers) {
    const managersIdArray = allProjectManagers.map((manager) => manager.id)
    return projectActiveUsers.filter((user) =>
      managersIdArray.includes(user.user_id)
    )
  }
}

export const getActivePmInCurrentProjectSelector = (state) => {
  const activeUsers = getProjectActiveUsersSelector(state)

  if (activeUsers) {
    return activeUsers.find((user) => user.is_project_manager === true)
  }
}

export const getActiveDevSelector = (state) => {
  const activeUsers = getProjectActiveUsersSelector(state)
  const activePm = getActiveProjectManagerSelector(state)
  if (activeUsers) {
    const pmIdArray = activePm.map((pm) => pm.user_id)
    return activeUsers.filter((user) => !pmIdArray.includes(user.user_id))
  }
}

export const getDeactivatedMembersSelector = (state) => {
  const activeUsers = getProjectActiveUsersSelector(state)
  if (activeUsers) {
    return activeUsers.filter((user) => user.is_active === false)
  }
}
