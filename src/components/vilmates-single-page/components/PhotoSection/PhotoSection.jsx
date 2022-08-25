import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import styles from './PhotoSection.module.scss'

export const PhotoSection = ({ name, role }) => {
  return (
    <Paper className={styles.section} component="section">
      <Avatar name={name} size="large" />
      <Typography className={styles.title} variant="h2">
        {name}
      </Typography>
      <Typography className={styles.subtitle} component="p">
        {role}
      </Typography>
    </Paper>
  )
}

PhotoSection.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}
