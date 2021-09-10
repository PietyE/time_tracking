import {
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_DEV_CONSOLIDATE_PROJECT_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_EDIT_USER_ID,
  SET_PROCESSED_STATUS,
  SET_IS_FETCHING_PROJECT_REPORTS,
  SET_CONSOLIDATE_PROJECT_REPORT,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reportsRefactored: [],
  // usersProjectReports: {},
  reports: {
    users: [],
    total_uah: '',
    total_usd: '',
    exchange_rate: '',
  },
  selectedProject: {
    email: "",
    id: "",
    name: "All Projects",
    role: null
  },
  selectedDeveloper: {
    email: "",
    id: "",
    name: "All Developers",
    role: null
  },
  isFetchingReports: false,
  developerProjectInProjectReport: [],
  editingUserId: '',
  userId: '',
}

export const projectsReport = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_PROJECTS_REPORT:
      return { ...state,
        isFetchingReports: true,
        selectedDate: action.payload }
    case SET_DEV_CONSOLIDATE_PROJECT_REPORT:
      return {
        ...state,
        isFetchingReports: false,
        reports: action.payload
      }
    case SET_CONSOLIDATE_PROJECT_REPORT:
      return {
        ...state,
        reportsRefactored: action.payload
      }
    case SET_PROCESSED_STATUS:
      return { ...state, isFetchingReports: true }
    case SET_SELECTED_DEVELOPER:
      return {
        ...state,
        isFetchingReports: true,
        selectedDeveloper: action.payload }
    case CLEAR_SELECTED_DEVELOPER:
      return { ...state, selectedDeveloper: initialState.selectedDeveloper }
    case SET_SELECTED_PROJECT_PROJECTREPORTS:
      return {
        ...state,
        isFetchingReports: true,
        selectedProject: action.payload }
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
  return state.projectsReport.reports.users.find(
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
