import { createSelector } from 'reselect'

const getDeveloperProjectsListSelector = (state) => {
  return state.developerProjects
}
const getAllProjectListSelector = (state) => {
  return state.projectsReport.developerProjectInProjectReport
}

export const getIsFetchingProjectsReport = (state) =>
  state.projectsReport.isFetchingReports

export const getProjectsSelector = createSelector(
  getDeveloperProjectsListSelector,
  (projects) => projects
)

export const getProjectsList = createSelector(
  [getAllProjectListSelector],
  (projectsList) => {
    let newProjectsList = [
      {
        id: '',
        logo: '',
        name: 'All Projects',
        developer_project_id: null,
      },
    ]
    projectsList.forEach((project) => {
      newProjectsList.push(project)
    })
    return newProjectsList
  }
)
