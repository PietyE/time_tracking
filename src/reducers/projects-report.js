import {
  CHANGE_SELECTED_DATE_PROJECTS_REPORT,
  SET_DEV_CONSOLIDATE_PROJECT_REPORT,
  SET_SELECTED_DEVELOPER,
  CLEAR_SELECTED_DEVELOPER,
  SET_SELECTED_PROJECT_PROJECTREPORTS,
  CLEAR_SELECTED_PROJECT_PROJECTREPORTS,
  SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT,
  SET_EDIT_USER_ID,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  reports: [],
  selectedProject: {},
  selectedDeveloper: {},
  isFetchingReports: false,
  developerProjectInProjectReport: [],
  editingUserId: '',
}
export const projectsReport = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_PROJECTS_REPORT:
      return { ...state, selectedDate: action.payload }
    case SET_DEV_CONSOLIDATE_PROJECT_REPORT:
      return { ...state, reports: action.payload }
    case SET_SELECTED_DEVELOPER:
      return { ...state, selectedDeveloper: action.payload }
    case CLEAR_SELECTED_DEVELOPER:
      return { ...state, selectedDeveloper: initialState.selectedDeveloper }
    case SET_SELECTED_PROJECT_PROJECTREPORTS:
      return { ...state, selectedProject: action.payload }
    case CLEAR_SELECTED_PROJECT_PROJECTREPORTS:
      return {
        ...state,
        selectedProject: initialState.selectedProject,
      }
    case SET_DEVELOPER_PROJECT_IN_PROJECT_REPORT:
      return { ...state, developerProjectInProjectReport: action.payload }
    case SET_EDIT_USER_ID:
      return { ...state, editingUserId: action.payload }
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
