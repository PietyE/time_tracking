import {
  CHANGE_SELECTED_DATE_PROJECTS_MANAGEMENT,
  SET_ALL_PROJECTS, SET_SELECTED_PROJECT, SET_USERS, SET_USERS_ON_PROJECT,SET_PROJECT_REPORTS,
} from 'constants/actions-constant'
import { createSelector } from '@reduxjs/toolkit';
const todayDate = new Date()

const initialState = {
  selectedDateForPM: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
  projects: [],
  projectsWithReports: [],
  selectedProjects: [],
  usersOnProject: {},
  users: [],
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



    case SET_SELECTED_PROJECT:
      console.log('action.payload SET_SELECTED_PROJECT>', action.payload)
      return { ...state, selectedProjects: action.payload }
    case SET_USERS_ON_PROJECT:
      console.log(' action.payload SET_USERS_ON_PROJECT>',  action.payload)
      // const qqq = { ...state.projectsManagement.usersOnProject, [action.payload.id]: action.payload.usersOnProject }
      // console.log('qqq >', qqq)
      return {...state, usersOnProject: action.payload}
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

export const getProjectsWithReport = (state) =>  state.projectsManagement.projectsWithReports

export const getProjectReportByIdSelector = (state,id) => {
  return getProjectsWithReport(state).find(project=>project.projectId === id)
}

export const getUsersSelector = state => state.developers.developersList
export const getUsersOnProjectSelector = (state) =>
  state.projectsManagement.usersOnProject

