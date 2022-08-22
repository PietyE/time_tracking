import React from 'react'
import { Grid } from '@material-ui/core'
import { comments } from './mocks'
import { CommentItem } from './components/CommentItem'

export const CommentsList = () => {
  const renderComments = comments.map((comment, index) => (
    <CommentItem comment={comment} key={index} />
  ))

  return <Grid container>{renderComments}</Grid>
}
