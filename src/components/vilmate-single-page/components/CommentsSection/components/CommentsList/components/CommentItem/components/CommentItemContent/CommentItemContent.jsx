import React from 'react'
import moment from 'moment'
import { Box, Paper, Typography } from '@material-ui/core'
import styles from './CommentItemContent.module.scss'

export const CommentItemContent = ({ text, date, name, id }) => {
  return (
    <Box className={styles.content_container}>
      <Paper className={styles.content}>
        <Typography variant="body2" component="p" className={styles.name}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ lineBreak: 'anywhere' }}
        >
          {text}
        </Typography>
      </Paper>
      <Box className={styles.actions}>
        <Typography variant="body2" component="p" className={styles.date}>
          {moment(date).format('ll')}
        </Typography>
        <Typography variant="body2" color="error" className={styles.delete}>
          Delete
        </Typography>
      </Box>
    </Box>
  )
}
