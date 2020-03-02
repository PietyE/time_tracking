import { createSelector } from 'reselect'

const getDeveloperProjectsListSelector = state => {
  return state.developerProjects
}

const getProjectsSelector = createSelector(
  getDeveloperProjectsListSelector,
  projects => projects
)

export { getProjectsSelector }
