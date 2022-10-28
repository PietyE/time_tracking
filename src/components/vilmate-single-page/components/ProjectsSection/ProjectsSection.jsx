import { Box, Button, IconButton, Typography } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import {
  vilmatesPageChangeUserOnProjectRequest,
  vilmatesPageGetDeveloperProjectsListRequest,
} from 'actions/vilmates-page'
import useEqualSelector from 'custom-hook/useEqualSelector'
import { ReactComponent as PlusIcon } from 'images/plus-icon.svg'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUsersSelector } from 'reducers/projects-management'
import { RightSessionContainer } from '../RightSessionsContainer'
import { CreateProjectListItemForm } from './components/CreateProjectListItemForm'
import { ProjectsList } from './components/ProjectsList'
import styles from './ProjectsSection.module.scss'
import { getUserPermissions } from '../../../../selectors/user'
import { userPermissions } from '../../../../constants/permissions'

export const ProjectsSection = ({ selectedUserId, projects }) => {
  const dispatch = useDispatch()
  const users = useEqualSelector(getUsersSelector)
  const [isFormShown, setIsFormShown] = useState(false)
  const permissions = useEqualSelector(getUserPermissions)

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
    <RightSessionContainer title="Works on" isHaveScroll={true}>
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
        <Box className={styles.formContainer}>
          <IconButton disableRipple onClick={hideFormHandler}>
            <ClearIcon />
          </IconButton>
          <CreateProjectListItemForm
            userId={selectedUserId}
            hideForm={hideFormHandler}
            developerProjects={projects}
          />
        </Box>
      )}
      {permissions?.includes(userPermissions.projects_add_developerproject) && (
        <Box className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<PlusIcon />}
            disabled={isFormShown}
            onClick={showFormHandler}
          >
            Assign to project
          </Button>
        </Box>
      )}
    </RightSessionContainer>
  )
}
