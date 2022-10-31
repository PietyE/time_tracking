import {
  Box,
  IconButton,
  ListItem,
  SvgIcon,
  Typography,
} from '@material-ui/core'
import { OCCUPATION } from 'constants/vilmates-page'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import { DeveloperOccupationRadioGroup } from '../DeveloperOccupationRadioGroup'
import { ReactComponent as TrashGrayIc } from 'images/trash_cray_ic.svg'
import styles from './ProjectListItem.module.scss'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getUserPermissions } from 'selectors/user'
import { userPermissions } from 'constants/permissions'

const { PART_TIME, FULL_TIME } = OCCUPATION

export const ProjectsListItem = ({
  title,
  isFullTimeValue,
  owner,
  developerProjectId,
  onDelete,
  onOccupationChange,
}) => {
  const [isOccupationHovered, setIsOccupationHovered] = useState(false)
  const [isFullTime, setIsFullTime] = useState(isFullTimeValue)
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false)
  const permissions = useShallowEqualSelector(getUserPermissions)

  const occupationLabel = useMemo(
    () => (isFullTime === false ? PART_TIME : FULL_TIME),
    [isFullTime]
  )

  const hoverOccupationHandler = () => {
    setIsOccupationHovered(true)
  }

  const blurOccupationHandler = () => {
    setIsOccupationHovered(false)
  }

  const occupationChangeHandler = (value) => {
    setIsFullTime(value)
    onOccupationChange(developerProjectId, value)
  }

  const ownerLabel = owner || 'No owner'

  const deleteProjectHandler = () => {
    setIsDeleteButtonDisabled(true)
    onDelete(developerProjectId)
  }

  return (
    <ListItem className={styles.container}>
      <Box className={styles.row}>
        <Typography className={styles.title} variant="h3">
          {title}
        </Typography>
        {permissions?.includes(
          userPermissions.projects_change_developerproject
        ) &&
          owner && (
            <Box className={styles.icon}>
              <IconButton
                color="primary"
                onClick={deleteProjectHandler}
                disabled={isDeleteButtonDisabled}
              >
                <SvgIcon component={TrashGrayIc} />
              </IconButton>
            </Box>
          )}
      </Box>

      <Box className={styles.row}>
        <Typography className={styles.ownerName} variant="body1">
          {ownerLabel}
        </Typography>
        {permissions?.includes(
          userPermissions.projects_change_developerproject
        ) &&
          owner && (
            <Box
              onMouseEnter={hoverOccupationHandler}
              onMouseLeave={blurOccupationHandler}
              className={styles.occupation}
            >
              {isOccupationHovered ? (
                <DeveloperOccupationRadioGroup
                  onChange={occupationChangeHandler}
                  isFullTime={isFullTime}
                />
              ) : (
                <Typography variant="body1">{occupationLabel}</Typography>
              )}
            </Box>
          )}
      </Box>
    </ListItem>
  )
}

ProjectsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isFullTimeValue: PropTypes.any,
  ownerName: PropTypes.any,
  developerProjectId: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
}
