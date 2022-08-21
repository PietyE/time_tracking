import { Box } from '@material-ui/core'
import { getAllProjects } from 'actions/projects-management'
import {
  vilmatesPageAddDeveloperProjectRequest,
  vilmatesPageChangeUserOnProjectRequest,
} from 'actions/vilmates-page'
import Autocomplete from 'components/ui/autocomplete'
import SpinnerStyled from 'components/ui/spinner'
import useEqualSelector from 'custom-hook/useEqualSelector'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProjectsSelector } from 'reducers/projects-management'
import { DeveloperOccupationRadioGroup } from '../DeveloperOccupationRadioGroup'
import styles from './CreateProjectListItemForm.module.scss'

const getTwoArraysDifference = (array1, array2) => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      if (!object2.is_active) {
        return false
      }
      return object1.id === object2.project.id
    })
  })
}

const getDeveloperProjectId = (project, developerProjects) =>
  developerProjects.reduce(
    (acc, developerProjectId) =>
      developerProjectId.project.id === project.id
        ? developerProjectId.id
        : acc,
    undefined
  )

export const CreateProjectListItemForm = ({
  userId,
  hideForm,
  developerProjects,
}) => {
  const dispatch = useDispatch()
  const projects = useEqualSelector(getAllProjectsSelector)
  const filteredProjects = getTwoArraysDifference(projects, developerProjects)

  const [selectedProject, setSelectedProject] = useState(null)
  const [isFullTime, setIsFullTime] = useState(true)

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  const payload = {
    project: selectedProject?.id,
    users: [
      {
        user_id: userId,
        is_full_time: isFullTime,
        is_project_manager: false,
        is_active: true,
      },
    ],
  }

  const setDeveloperProjectHandler = () => {
    hideForm()
    const developerProjectId = getDeveloperProjectId(
      selectedProject,
      developerProjects
    )
    const functionToDispatch = developerProjectId
      ? vilmatesPageChangeUserOnProjectRequest({
          developerProjectId,
          data: { is_full_time: isFullTime, is_active: true },
        })
      : vilmatesPageAddDeveloperProjectRequest(payload)

    dispatch(functionToDispatch)
  }

  useEffect(() => {
    if (selectedProject) {
      setDeveloperProjectHandler()
    }
  }, [selectedProject])

  if (!filteredProjects || !filteredProjects.length) {
    return <SpinnerStyled />
  }

  return (
    <Box className={styles.container}>
      <Autocomplete
        placeholder="Select project"
        options={filteredProjects}
        value={selectedProject}
        onChange={setSelectedProject}
        getOptionLabel={(option) => option.name}
      />
      <Box className={styles.row}>
        <DeveloperOccupationRadioGroup
          isFullTime={isFullTime}
          onChange={setIsFullTime}
        />
      </Box>
    </Box>
  )
}
