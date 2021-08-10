import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT,  SET_SELECTED_PROJECT_ID,SET_PROJECT_REPORTS,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDateForPM: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  projects: [],
  projectsWithReports: [],
  selectedProjectId:'',
  selectedProject: {},
  // usersOnProject: {},
  // users: [],
}
const setProjectsWithReports = (state, action) => {
  let projectsWithReports = []
  const index = state.projectsWithReports.findIndex(el=>el.project_id)
  if(index === -1){
    projectsWithReports = [...state.projectsWithReports, action.payload]
  }else{
    projectsWithReports = [...state.projectsWithReports]
    projectsWithReports[index] = action.payload
  }
  return {...state, projectsWithReports: projectsWithReports}
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




    default:
      return state
  }
}

export const getSelectedMonthForPMSelector = (state) =>
  state.projectsManagement.selectedDateForPM

export const getAllProjectsSelector = (state) =>
  state.projectsManagement.projects

export const getProjectsWithReportSelector = (state) =>  state.projectsManagement.projectsWithReports

export const getProjectReportByIdSelector = (state,id) => {
  return getProjectsWithReportSelector(state).find(project=>project.projectId === id)
}
export const getSelectedProjectIdSelector = state => state.projectsManagement.selectedProjectId
export const getSelectedProjectSelector = state => state.projectsManagement.selectedProject

export const getProjectName = state =>{
  const id = getSelectedProjectIdSelector(state)
  const projects = getAllProjectsSelector(state)
  const currentProject = projects.find(project=>project.id === id)
  return currentProject?.name
}

export const getActiveUsersSelector = state => {
  const id = getSelectedProjectIdSelector(state)
  const reports = getProjectsWithReportSelector(state, id)
  const currentProjectReports = reports.find(rep => rep.projectId === id)
  return currentProjectReports?.users?.map(report=>({
    user_id: report.userId,
    // name: state.developers.developersList.find(dev => dev.id === report.user.id),
    name: report.userName,
    is_full_time:report?.is_full_time,
    is_active: report?.is_active,
  }))
}




export const getUsersSelector = state => state.developers.developersList

