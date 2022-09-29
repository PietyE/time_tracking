import {
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_ALL_DEVELOPER_PROJECTS,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_EDIT_USER_ID,
  SET_PROCESSED_STATUS,
  SET_IS_FETCHING_PROJECT_REPORTS,
  SET_CONSOLIDATE_PROJECT_REPORT,
  LOG_OUT,
  GET_USERS_HOURS_AUTH_URL_REQUEST,
  GET_USERS_HOURS_AUTH_URL_SUCCESS,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reportsRefactored: [],
  reports: {
    users: [],
    total_uah: '',
    total_usd: '',
    exchange_rate: '',
  },
  selectedProject: {
    email: '',
    id: '',
    name: 'All Projects',
    role: null,
  },
  selectedDeveloper: {
    email: '',
    id: '',
    name: 'All Developers',
    role: null,
  },
  isFetchingReports: false,
  developerProjectInProjectReport: [],
  selectAllDevelopersProject: [],
  editingUserId: '',
  userId: '',
  google_auth_url: '',
}

export const projectsReport = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_PROJECTS_REPORT:
      return { ...state, isFetchingReports: true }
    case SET_CONSOLIDATE_PROJECT_REPORT:
      return {
        ...state,
        isFetchingReports: false,
        reportsRefactored: action.payload,
      }
    case SET_PROCESSED_STATUS:
      return { ...state, isFetchingReports: true }
    case SET_SELECTED_DEVELOPER:
      return {
        ...state,
        isFetchingReports: true,
        selectedDeveloper: action.payload,
      }
    case CLEAR_SELECTED_DEVELOPER:
      return { ...state, selectedDeveloper: initialState.selectedDeveloper }
    case SET_SELECTED_PROJECT_PROJECTREPORTS:
      return {
        ...state,
        isFetchingReports: false,
        selectedProject: action.payload,
      }
    case CLEAR_SELECTED_PROJECT_PROJECTREPORTS:
      return {
        ...state,
        selectedProject: initialState.selectedProject,
      }
    case SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT:
      return { ...state, developerProjectInProjectReport: action.payload }
    case SET_EDIT_USER_ID:
      return { ...state, editingUserId: action.payload }
    case SET_IS_FETCHING_PROJECT_REPORTS:
      return { ...state, isFetchingReports: action.payload }
    case LOG_OUT:
      return {
        ...state,
        reportsRefactored: [],
      }
    // case SAVE_COMMENTS_HISTORY:
    //   const {data} = action.payload
    //   return {
    //     ...state,
    //     reportHistory: data
    //   }
    case SET_ALL_DEVELOPER_PROJECTS:
      return { ...state, selectAllDevelopersProject: action.payload }
    case GET_USERS_HOURS_AUTH_URL_REQUEST:
      return {
        ...state,
        isFetchingReports: true,
      }
    case GET_USERS_HOURS_AUTH_URL_SUCCESS:
      return {
        ...state,
        isFetchingReports: false,
        google_auth_url: action.payload,
      }
    default:
      return state
  }
}

export const getProjectInTimeReportSelector = (state) =>
  state.projectsReport.developerProjectInProjectReport

export const getSelectedProjectSelector = (state) =>
  state.projectsReport.selectedProject

export const getEditingUserIdSelector = (state) =>
  state.projectsReport.editingUserId

export const getEditingUser = (state) => {
  const editingUserId = state.projectsReport.editingUserId
  return state.projectsReport.reportsRefactored.find(
    (report) => report.id === editingUserId
  )
}

export const getSelectedMonthSelector = (state) =>
  state.projectsReport.selectedDate

export const getDevProjectConsolidateProjectReportsSelector = (state) =>
  state.projectsReport.reports

export const getSelectDeveloperInProjectReportSelector = (state) =>
  state.projectsReport.selectedDeveloper

export const selectUsersReports = (state) =>
  state.projectsReport.reportsRefactored

export const selectAllProjects = (state) =>
  state.projectsReport.selectAllDevelopersProject

export const getGoogleSyncWithDriveUrl = (state) =>
  state.projectsReport.google_auth_url
