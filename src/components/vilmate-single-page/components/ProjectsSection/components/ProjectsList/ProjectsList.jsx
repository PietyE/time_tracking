import { List } from '@material-ui/core'
import React from 'react'
import { findListItemById } from 'utils/common'
import { ProjectsListItem } from '../ProjectsListItem'
import styles from './ProjectsList.module.scss'

export const ProjectsList = ({
  users,
  developerProjects,
  deleteProjectHandler,
  changeOccupationHandler,
}) => {
  const renderListItems = developerProjects
    .filter((project) => project.is_active)
    .map((developerProject) => {
      const { project, is_full_time: isFullTime } = developerProject
      const ownerObject = findListItemById(users, project.owner)
      const owner = ownerObject?.name || ownerObject?.email

      return (
        <ProjectsListItem
          key={project.id}
          title={project.name}
          isFullTimeValue={isFullTime}
          owner={owner}
          developerProjectId={developerProject.id}
          onDelete={deleteProjectHandler}
          onOccupationChange={changeOccupationHandler}
        />
      )
    })

  return <List className={styles.list}>{renderListItems}</List>
}
