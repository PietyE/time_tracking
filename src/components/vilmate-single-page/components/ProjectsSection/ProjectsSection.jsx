import { Button, Paper, Typography } from '@material-ui/core'
import {
  vilmatesPageChangeUserOnProjectRequest,
  vilmatesPageGetDeveloperProjectsListRequest
} from 'actions/vilmates-page'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as PlusIcon } from 'images/plus-icon.svg'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersSelector } from 'reducers/projects-management'
import { CreateProjectListItemForm } from './components/CreateProjectListItemForm'
import { ProjectsList } from './components/ProjectsList'
import styles from './ProjectsSection.module.scss'

export const ProjectsSection = ({ selectedUserId, projects }) => {
  const dispatch = useDispatch()
  const users = useEqualSelector(getUsersSelector)
  const [isFormShown, setIsFormShown] = useState(false)

  useEffect(() => {
    dispatch(vilmatesPageGetDeveloperProjectsListRequest(selectedUserId))
  }, [selectedUserId])

  const hideFormHandler = () => {
    setIsFormShown(false)
  }

  const showFormHandler = () => {
    setIsFormShown(true)
  }

  const _vilmatesPageChangeUserOnProjectRequest = (
    developerProjectId,
    data
  ) => {
    dispatch(
      vilmatesPageChangeUserOnProjectRequest({
        developerProjectId,
        data,
      })
    )
  }

  const deleteProjectHandler = (developerProjectId) => {
    _vilmatesPageChangeUserOnProjectRequest(developerProjectId, {
      is_active: false,
    })
  }

  const changeOccupationHandler = (developerProjectId, isFullTime) => {
    _vilmatesPageChangeUserOnProjectRequest(developerProjectId, {
      is_full_time: isFullTime,
    })
  }

  return (
    <Paper className={styles.section} component="section">
      <Typography className={styles.title} variant="h2">
        Works on
      </Typography>
      {projects.length ? (
        <ProjectsList
          users={users}
          developerProjects={projects}
          deleteProjectHandler={deleteProjectHandler}
          changeOccupationHandler={changeOccupationHandler}
        />
      ) : (
        <Typography>No projects yet</Typography>
      )}
      {isFormShown && (
        <CreateProjectListItemForm
          userId={selectedUserId}
          hideForm={hideFormHandler}
          developerProjects={projects}
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
        Assign to project
      </Button>
    </Paper>
  )
}
