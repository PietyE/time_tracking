import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { CommentItem } from './components/CommentItem'
import { useDispatch } from 'react-redux'
import { vilmatesPageGetCommentsRequest } from 'actions/vilmates-page'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getComments } from 'selectors/vilmates-page'

export const CommentsList = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const comments = useShallowEqualSelector(getComments)
  useEffect(() => {
    dispatch(vilmatesPageGetCommentsRequest(userId))
  }, [])
  const renderComments = comments.map((comment) => (
    <CommentItem comment={comment} key={comment.id} />
  ))

  return <Grid container>{renderComments}</Grid>
}
