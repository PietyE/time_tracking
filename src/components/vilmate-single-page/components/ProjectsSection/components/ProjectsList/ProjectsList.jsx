import { List } from '@material-ui/core'
import React from 'react'
import { ProjectsListItem } from '../ProjectsListItem'

export const ProjectsList = ({
  developerProjects,
  deleteProjectHandler,
  changeOccupationHandler,
}) => {
  const renderListItems = developerProjects.map((developerProject) => {
    const { project, is_full_time: isFullTime, ownerName } = developerProject
    return (
      <ProjectsListItem
        key={project.id}
        title={project.name}
        isFullTimeValue={isFullTime}
        ownerName={ownerName}
        developerProjectId={developerProject.id}
        onDelete={deleteProjectHandler}
        onOccupationChange={changeOccupationHandler}
      />
    )
  })

  return <List>{renderListItems}</List>
}