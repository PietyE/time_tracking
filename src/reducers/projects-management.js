import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT, SET_SELECTED_PROJECT_ID, SET_PROJECT_REPORTS,
  CLEAR_PM_PROJECTS, SET_IS_FETCHING_PM_PAGE
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDateForPM: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  projects: [],
  projectsWithReports: [],
  selectedProjectId: '',
  selectedProject: {},
  isFetchingPmPage:false,
}
const setProjectsWithReports = (state, action) => {
  let projectsWithReports = []
  const index = state.projectsWithReports.findIndex(el => el.projectId === action.payload.projectId)
  if (index === -1) {
    projectsWithReports = [...state.projectsWithReports, action.payload]
  } else {
    projectsWithReports = [...state.projectsWithReports]
    projectsWithReports[index] = action.payload
  }
  return { ...state, projectsWithReports: projectsWithReports }
}

export const projectsManagement = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT:
      return { ...state, selectedDateForPM: action.payload }
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
    default:
      return state
  }
}

export const getIsFetchingPmPageSelector = state => state.projectsManagement.isFetchingPmPage

export const getUsersSelector = state => state.developers.developersList

export const getProjectManagerListSelector = state => {
  const users = getUsersSelector(state)
  return users.filter(user => user.role === 4)
}
export const getDeveloperSelector = state => {
  const users = getUsersSelector(state)
  return users.filter(user => user.role === 1)
}
///////////////////////////////////////////////////////
export const getSelectedMonthForPMSelector = (state) =>
  state.projectsManagement.selectedDateForPM
///////////////////////////////////////////////////////
export const getAllProjectsSelector = (state) =>
  state.projectsManagement.projects

export const getProjectsWithReportSelector = (state) => state.projectsManagement.projectsWithReports

export const getProjectReportByIdSelector = (state, id) => {
  return getProjectsWithReportSelector(state).find(project => project.projectId === id)
}
export const getSelectedProjectIdSelector = state => state.projectsManagement.selectedProjectId
export const getSelectedProjectSelector = state => state.projectsManagement.selectedProject
///////////////////////////////////////////////////////

export const getProjectName = state => {
  const id = getSelectedProjectIdSelector(state)
  const projects = getAllProjectsSelector(state)
  const currentProject = projects.find(project => project.id === id)
  return currentProject?.name
}
///////////////////////////////////////////////////////
export const getProjectActiveUsersSelector = state => {
  const projectId = getSelectedProjectIdSelector(state)
  const reports = getProjectsWithReportSelector(state, projectId)
  const currentProjectReports = reports.find(rep => rep.projectId === projectId)
  return currentProjectReports?.users?.map(report => ({
    user_id: report.userId,
    name: report.userName,
    is_full_time: report?.is_full_time,
    is_active: report?.is_active,
    projectReportId: report?.projectReportId,
  }))
}

export const getActiveProjectManagerSelector = state => {
  const projectActiveUsers = getProjectActiveUsersSelector(state)
  const allProjectManagers = getProjectManagerListSelector(state)
  if (projectActiveUsers) {
    const managersIdArray = allProjectManagers.map(manager => manager.id)
    return projectActiveUsers.filter(user => managersIdArray.includes(user.user_id))

  }
}

export const getActivePmInCurrentProjectSelector = state => {
  const projectManagers = getActiveProjectManagerSelector(state)
  if (projectManagers) {
    return projectManagers.find(pm => pm.is_active === true)
  }
}

export const getActiveDevSelector = state => {
  const activeUsers = getProjectActiveUsersSelector(state)
  const activePm = getActiveProjectManagerSelector(state)

  if (activeUsers) {
    const pmIdArray = activePm.map(pm => pm.user_id)
    return activeUsers.filter(user => !pmIdArray.includes(user.user_id))
  }
}

export const getDeactivatedMembersSelector = state => {
  const activeUsers = getProjectActiveUsersSelector(state)
  if (activeUsers) {
    return activeUsers.filter(user => user.is_active === false)
  }
}




