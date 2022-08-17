import { List } from '@material-ui/core'
import React from 'react'
import { ProjectsListItem } from '../ProjectsListItem'
import styles from './ProjectsList.module.scss'

export const ProjectsList = ({ developerProjects }) => {
  const renderListItems = developerProjects.map((developerProject) => {
    const { project, is_full_time: isFullTime, ownerName } = developerProject
    return (
      <ProjectsListItem
        key={project.id}
        title={project.name}
        isFullTime={isFullTime}
        ownerName={ownerName}
        developerProject={developerProject}
      />
    )
  })

  return <List className={styles.container}>{renderListItems}</List>
}
