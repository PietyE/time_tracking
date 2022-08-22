import { Box, ListItem, Typography } from '@material-ui/core'
import { OCCUPATION } from 'constants/vilmates-page'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import styles from './ProjectListItem.module.scss'

const { PART_TIME, FULL_TIME } = OCCUPATION

export const ProjectsListItem = ({
  title,
  isFullTime,
  ownerName,
  developerProject,
}) => {
  const occupation = isFullTime === false ? PART_TIME : FULL_TIME

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
      <Box className={styles.content}>
        <Typography className={styles.text} variant="body1">
          {getOwnerNameLabel()}
        </Typography>
        <Typography className={styles.occupation} variant="body1">
          {occupation}
        </Typography>
      </Box>
    </ListItem>
  )
}

ProjectsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isFullTime: PropTypes.any,
  ownerName: PropTypes.any,
  developerProject: PropTypes.object.isRequired,
}
