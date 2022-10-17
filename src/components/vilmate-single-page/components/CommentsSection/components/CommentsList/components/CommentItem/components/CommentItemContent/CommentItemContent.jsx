import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { Box, Paper, Typography } from '@material-ui/core'
import { vilmatesPageDeleteCommentsRequest } from 'actions/vilmates-page'
import styles from './CommentItemContent.module.scss'

export const CommentItemContent = ({ text, date, name, id }) => {
  const dispatch = useDispatch()
  const handleDeleteComment = (id) =>
    dispatch(vilmatesPageDeleteCommentsRequest(id))

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
        <Typography
          variant="body2"
          color="error"
          className={styles.delete}
          onClick={() => handleDeleteComment(id)}
        >
          Delete
        </Typography>
      </Box>
    </Box>
  )
}
