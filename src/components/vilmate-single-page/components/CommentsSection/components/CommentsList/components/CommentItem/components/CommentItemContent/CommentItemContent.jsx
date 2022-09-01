import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import styles from './CommentItemContent.module.scss'

export const CommentItemContent = ({ comment }) => (
  <Box className={styles.content_container}>
    <Paper className={styles.content}>
      <Typography variant="body2" component="p" className={styles.name}>
        {comment.name}
      </Typography>
      <Typography variant="body2" component="p">
        {comment.text}
      </Typography>
    </Paper>
    <Typography variant="body2" component="p" className={styles.date}>
      {comment.date_create}
    </Typography>
  </Box>
)
