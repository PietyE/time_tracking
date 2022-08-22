import { Button, Paper, Typography } from '@material-ui/core'
import { vilmatesPageGetDeveloperProjectsListRequest } from 'actions/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as PlusIcon } from 'images/plus-icon.svg'
import React, { useEffect, useState } from 'react'
import { getUsersSelector } from 'reducers/projects-management'
import { getSelectedUserDeveloperProjects } from 'selectors/vilmates-page'
import { getDevelopersByProjectId } from 'utils/api'
import useFetchUserDataById from '../helpers/useFetchUserData'
import { ProjectsList } from './components/ProjectsList'
import styles from './ProjectsSection.module.scss'

export const ProjectsSection = ({ selectedUserId }) => {
  const fetchedDeveloperProjects = useFetchUserDataById(
    vilmatesPageGetDeveloperProjectsListRequest,
    getSelectedUserDeveloperProjects
  )
  const users = useEqualSelector(getUsersSelector)
  const [developerProjects, setDeveloperProjects] = useState([])

  const getProjectOwnerName = async (projectId) => {
    const { data: projectDevelopers } = await getDevelopersByProjectId(
      projectId
    )

    if (!projectDevelopers || !projectDevelopers.length) {
      return undefined
    }

    const currentProjectManagerId = projectDevelopers.find(
      (developer) => developer.is_project_manager
    )?.user

    if (currentProjectManagerId) {
      return users.find((user) => user.id === currentProjectManagerId)?.name
    }
    return null
  }

  const handleDeveloperProjectsMapping = async () => {
    const mappedDeveloperProjects = await Promise.all(
      fetchedDeveloperProjects.map(async (fetchedDeveloperProject) => ({
        ...fetchedDeveloperProject,
        ownerName: await getProjectOwnerName(
          fetchedDeveloperProject.project.id
        ),
      }))
    )
    setDeveloperProjects(mappedDeveloperProjects)
  }

  
  useEffect(() => {
    if (fetchedDeveloperProjects?.length) {
      handleDeveloperProjectsMapping()
    }
  }, [fetchedDeveloperProjects])

  const areDeveloperProjectsLoaded =
    developerProjects?.length &&
    developerProjects?.[0].user === selectedUserId
  
  if (!areDeveloperProjectsLoaded) {
    return <SpinnerStyled />
  }

  return (
    <Paper className={styles.section}>
      <Typography className={styles.title} variant="h2">
        Works on
      </Typography>
      {developerProjects.length ? (
        <ProjectsList developerProjects={developerProjects} />
      ) : (
        <Typography>No projects yet</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PlusIcon />}
      >
        Add new project
      </Button>
    </Paper>
  )
}
