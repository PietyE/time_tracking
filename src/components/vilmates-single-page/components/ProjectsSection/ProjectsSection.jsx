import { Button, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { ReactComponent as PlusIcon } from 'images/plus-icon.svg'
import styles from './ProjectsSection.module.scss'

export const ProjectsSection = () => {
  return (
    <Paper className={styles.section}>
      <Typography className={styles.title} variant="h2">
        Works on
      </Typography>
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
