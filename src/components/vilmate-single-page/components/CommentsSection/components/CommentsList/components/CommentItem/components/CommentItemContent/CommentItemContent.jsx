import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import styles from './CommentItemContent.module.scss'
import moment from 'moment'

export const CommentItemContent = ({ comment, name }) => (
  <Box className={styles.content_container}>
    <Paper className={styles.content}>
      <Typography variant="body2" component="p" className={styles.name}>
        {name}
      </Typography>
      <Typography variant="body2" component="p">
        {comment.text}
      </Typography>
    </Paper>
    <Typography variant="body2" component="p" className={styles.date}>
      {moment(comment.date_create).format('ll')}
    </Typography>
  </Box>
)
