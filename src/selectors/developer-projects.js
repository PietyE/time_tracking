import { createSelector } from 'reselect'

//const getSelectedDate = state => state.timereports.selectedDate

const getDeveloperProjectsNamesSelector = state => {
  const projects = state.developerProjects.items
  return projects
}

const getProjectsSelector = createSelector(
  getDeveloperProjectsNamesSelector,
  projects => projects
)

export { getProjectsSelector }
