import { createSelector } from 'reselect'

//const getSelectedDate = state => state.timereports.selectedDate

const getDeveloperProjectsNamesSelector = state => {
  const projects = state.developerProjects.items
  return projects
}

const getDeveloperProjectNames = createSelector(
  getDeveloperProjectsNamesSelector,
  projects => projects
)

export { getDeveloperProjectNames }
