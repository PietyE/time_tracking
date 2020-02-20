import { createSelector } from 'reselect'

//const getSelectedDate = state => state.timereports.selectedDate

const getDeveloperProjectsNamesSelector = state => {
  const projects = state.developerProjects.items.map(project => {
    return project.project
  })
  return projects
}

const getDeveloperProjectNames = createSelector(
  getDeveloperProjectsNamesSelector,
  projects => projects
)

export { getDeveloperProjectNames }
