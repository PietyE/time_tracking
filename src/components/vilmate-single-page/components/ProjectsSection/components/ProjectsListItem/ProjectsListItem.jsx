import { Box, ListItem, Typography } from '@material-ui/core'
import { vilmatesPageChangeUserOnProjectRequest } from 'actions/vilmates-page'
import { OCCUPATION } from 'constants/vilmates-page'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DeveloperOccupationRadioGroup } from '../DeveloperOccupationRadioGroup'
import styles from './ProjectListItem.module.scss'

const { PART_TIME, FULL_TIME } = OCCUPATION

export const ProjectsListItem = ({
  title,
  isFullTimeValue,
  ownerName,
  developerProjectId,
}) => {
  const dispatch = useDispatch()
  const [isOccupationHovered, setIsOccupationHovered] = useState(false)
  const [isFullTime, setIsFullTime] = useState(isFullTimeValue)

  const occupationLabel = useMemo(
    () => (isFullTime === false ? PART_TIME : FULL_TIME),
    [isFullTime]
  )

  console.log(isFullTime);

  const hoverOccupationHandler = () => {
    setIsOccupationHovered(true)
  }

  const blurOccupationHandler = () => {
    setIsOccupationHovered(false)
  }

  const changeDeveloperOccupation = (developerProjectId, isFullTime) => {
    dispatch(
      vilmatesPageChangeUserOnProjectRequest({
        developerProjectId,
        data: { is_full_time: isFullTime },
      })
    )
  }

  const occupationTypeChangeHandler = (value) => {
    changeDeveloperOccupation(developerProjectId, value)
    setIsFullTime(value)
  }

  const getOwnerNameLabel = () => {
    if (ownerName === undefined) {
      return '...'
    } else if (ownerName === null) {
      return 'No owner'
    }
    return ownerName
  }

  return (
    <ListItem className={styles.container}>
      <Typography className={styles.title} variant="h3">
        {title}
      </Typography>
      <Box className={styles.row}>
        <Typography className={styles.ownerName} variant="body1">
          {getOwnerNameLabel()}
        </Typography>
        <Box
          onMouseEnter={hoverOccupationHandler}
          onMouseLeave={blurOccupationHandler}
          className={styles.occupation} 
        >
          {isOccupationHovered ? (
            <DeveloperOccupationRadioGroup
              onChange={occupationTypeChangeHandler}
              isFullTime={isFullTime}
            />
          ) : (
            <Typography variant="body1">
              {occupationLabel}
            </Typography>
          )}
        </Box>
      </Box>
    </ListItem>
  )
}

ProjectsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isFullTimeValue: PropTypes.any,
  ownerName: PropTypes.any,
  developerProjectId: PropTypes.string.isRequired,
}
