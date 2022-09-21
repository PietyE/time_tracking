import {
  ADD_DEVELOPER_TO_PROJECT,
  ADD_INACTIVE_PROJECT_MANAGER_TO_PROJECT,
  ADD_PROJECT_OWNER_TO_PROJECT,
  ADD_USERS_ON_PROJECT,
  CHANGE_PROJECT_NAME,
  CHANGE_PROJECT_OWNER,
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  CHANGE_USERS_ON_PROJECT,
  CLEAR_PM_PAGE,
  CLEAR_PM_PROJECTS,
  CREATE_PROJECT,
  GET_ACTIVE_PROJECTS,
  GET_ALL_PROJECTS,
  GET_DEVELOPER_PROJECTS_BY_ID,
  GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT,
  GET_DOWNLOAD_PROJECT_REPORT,
  GET_PROJECT_REPORT_BY_ID,
  GET_SELECTED_PROJECT,
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

export const changeSelectedDateProjectsManagement = (payload) => ({
  type: CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  payload,
})

export const getAllProjects = (payload) => ({
  type: GET_ALL_PROJECTS,
  payload,
})

export const getActiveProjects = (payload) => ({
  type: GET_ACTIVE_PROJECTS,
  payload,
})

export const setAllProjects = (payload) => ({
  type: SET_ALL_PROJECTS,
  payload,
})

export const getProjectReportById = (payload) => ({
  type: GET_PROJECT_REPORT_BY_ID,
  payload,
})

export const getDeveloperProjectsById = (payload) => ({
  type: GET_DEVELOPER_PROJECTS_BY_ID,
  payload,
})

export const setProjectsWithReport = (payload) => ({
  type: SET_PROJECT_REPORTS,
  payload,
})

export const downloadProjectReport = (payload) => ({
  type: GET_DOWNLOAD_PROJECT_REPORT,
  payload,
})
export const downloadAllTeamProjectReport = (payload) => ({
  type: GET_DOWNLOAD_ALL_TEAM_PROJECT_REPORT,
  payload,
})

export const createProject = (payload) => ({
  type: CREATE_PROJECT,
  payload,
})
export const setSelectedProjectId = (payload) => ({
  type: SET_SELECTED_PROJECT_ID,
  payload,
})

export const setSelectedProject = (payload) => ({
  type: SET_SELECTED_PROJECT,
  payload,
})

export const getSelectedProject = (payload) => ({
  type: GET_SELECTED_PROJECT,
  payload,
})

export const changeProjectName = (payload) => ({
  type: CHANGE_PROJECT_NAME,
  payload,
})
export const changeUserOnProject = (payload) => ({
  type: CHANGE_USERS_ON_PROJECT,
  payload,
})

export const addUsersOnProject = (payload) => ({
  type: ADD_USERS_ON_PROJECT,
  payload,
})

export const addProjectOwnerToProject = (projectOwnerId) => ({
  type: ADD_PROJECT_OWNER_TO_PROJECT,
  payload: projectOwnerId,
})

export const clearPmProjects = (payload) => ({
  type: CLEAR_PM_PROJECTS,
  payload,
})

export const setFetchingPmPage = (payload) => ({
  type: SET_IS_FETCHING_PM_PAGE,
  payload,
})

export const setShowEditModal = (payload) => ({
  type: SET_SHOW_EDIT_MODAL,
  payload,
})
export const setShowCreateModal = (payload) => ({
  type: SET_SHOW_CREATE_MODAL,
  payload,
})

export const setShowCreateUserModal = (payload) => ({
  type: SET_SHOW_CREATE_USER_MODAL,
  payload,
})

export const setPm = (payload) => ({
  type: SET_SELECTED_PM,
  payload,
})

export const setShownProject = (payload) => ({
  type: SET_SHOWN_PROJECT,
  payload,
})

export const clearPmPageState = () => ({
  type: CLEAR_PM_PAGE,
})

export const changedProjectOwner = (payload) => ({
  type: CHANGE_PROJECT_OWNER,
  payload,
})

export const addInactiveProjectManagerToProject = (payload) => ({
  type: ADD_INACTIVE_PROJECT_MANAGER_TO_PROJECT,
  payload,
})

export const addDeveloperToProject = (payload) => ({
  type: ADD_DEVELOPER_TO_PROJECT,
  payload,
})
