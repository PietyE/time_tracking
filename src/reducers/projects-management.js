import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT, SET_USERS, SET_USERS_ON_PROJECT,
} from 'constants/actions-constant'

const todayDate = new Date()

const initialState = {
  selectedDateForPM: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  projects: [],
  selectedProjects: [],
  usersOnProject: {},
  users: [],
}
export const projectsManagement = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT:
      return { ...state, selectedDateForPM: action.payload }
    case SET_ALL_PROJECTS:
      return { ...state, projects: action.payload }
    case SET_SELECTED_PROJECT:
      console.log('action.payload SET_SELECTED_PROJECT>', action.payload)
      return { ...state, selectedProjects: action.payload }
    case SET_USERS_ON_PROJECT:
      console.log(' action.payload SET_USERS_ON_PROJECT>',  action.payload)
      // const qqq = { ...state.projectsManagement.usersOnProject, [action.payload.id]: action.payload.usersOnProject }
      // console.log('qqq >', qqq)
      return {
        ...state,
        // usersOnProject: qqq,
      }
    case SET_USERS:
      console.log('action.payload SET_USERS>', action.payload)
      return { ...state, users: action.payload }

    default:
      return state
  }
}

export const getSelectedMonthForPMSelector = (state) =>
  state.projectsManagement.selectedDateForPM

export const getAllProjectsSelector = (state) =>
  state.projectsManagement.projects

export const getUsersOnProjectSelector = (state) =>
  state.projectsManagement.usersOnProject

