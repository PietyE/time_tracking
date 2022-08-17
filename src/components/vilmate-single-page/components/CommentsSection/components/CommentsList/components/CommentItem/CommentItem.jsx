import React from 'react'
import { Grid } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import { CommentItemContent } from './components/CommentItemContent'
import styles from './CommentItem.module.scss'

export const CommentItem = ({ comment }) => (
  <Grid item xs={12} className={styles.comment_container}>
    <Avatar name={comment.name} size="small" />
    <CommentItemContent comment={comment} />
  </Grid>
)
