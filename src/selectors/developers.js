import { createSelector } from 'reselect'

export const getDevelopersSelector = (state) => state.developers.developersList

export const getDevelopersList = createSelector([getDevelopersSelector],(developersList) => {
  let newDevelopersList = [
    {
      email: '',
      id: '',
      name: 'All Developers',
      role: null
    }
  ]
  developersList.forEach(developer => {
    newDevelopersList.push(developer)
  })
  return newDevelopersList;
})
