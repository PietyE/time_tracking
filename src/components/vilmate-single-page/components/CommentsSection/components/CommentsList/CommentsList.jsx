import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { comments } from './mocks'
import { Avatar } from 'components/ui/avatar'
import styles from './CommentsList.module.scss'

export const CommentsList = () => {
  const renderComments = comments.map((comment, index) => (
    <Grid item xs={12} key={index} className={styles.comment_container}>
      <Avatar name={comment.name} size="small" />
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
          {comment.date}
        </Typography>
      </Box>
    </Grid>
  ))

  return <Grid container>{renderComments}</Grid>
}
