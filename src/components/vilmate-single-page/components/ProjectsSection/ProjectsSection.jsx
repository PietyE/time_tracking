import { Button, Paper, Typography } from '@material-ui/core'
import { vilmatesPageGetDeveloperProjectsListRequest } from 'actions/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as PlusIcon } from 'images/plus-icon.svg'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersSelector } from 'reducers/projects-management'
import { getSelectedUserDeveloperProjects } from 'selectors/vilmates-page'
import { getDevelopersByProjectId } from 'utils/api'
import { CreateProjectListItemForm } from './components/CreateProjectListItemForm'
import { ProjectsList } from './components/ProjectsList'
import styles from './ProjectsSection.module.scss'

export const ProjectsSection = ({ selectedUserId }) => {
  const dispatch = useDispatch()
  const fetchedDeveloperProjects = useEqualSelector(
    getSelectedUserDeveloperProjects
  )
  const users = useEqualSelector(getUsersSelector)
  const [developerProjects, setDeveloperProjects] = useState()
  const [isFormShown, setIsFormShown] = useState(false)

  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()

  useEffect(() => {
    dispatch(
      vilmatesPageGetDeveloperProjectsListRequest(selectedUserId, year, month)
    )
  }, [selectedUserId])

  const hideFormHandler = () => {
    setIsFormShown(false)
  }

  const showFormHandler = () => {
    setIsFormShown(true)
  }

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

  const modifyDeveloperProjectsHandler = async () => {
    const modifiedDeveloperProjects = []

    for (const fetchedDeveloperProject of fetchedDeveloperProjects) {
      if (fetchedDeveloperProject.is_active) {
        modifiedDeveloperProjects.push({
          ...fetchedDeveloperProject,
          ownerName: await getProjectOwnerName(
            fetchedDeveloperProject.project.id
          ),
        })
      }
    }

    setDeveloperProjects(modifiedDeveloperProjects)
  }

  const areDeveloperProjectsLoaded =
    fetchedDeveloperProjects?.length &&
    fetchedDeveloperProjects?.[0].user.id === selectedUserId

  useEffect(() => {
    if (areDeveloperProjectsLoaded) {
      modifyDeveloperProjectsHandler()
    }
  }, [fetchedDeveloperProjects])

  if (!developerProjects) {
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
      {isFormShown && (
        <CreateProjectListItemForm
          userId={selectedUserId}
          hideForm={hideFormHandler}
          developerProjects={fetchedDeveloperProjects}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PlusIcon />}
        disabled={isFormShown}
        onClick={showFormHandler}
        className={styles.button}
      >
        Add new project
      </Button>
    </Paper>
  )
}
