import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { CommentItem } from './components/CommentItem'
import { vilmatesPageGetCommentsRequest } from 'actions/vilmates-page'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getComments, getCommentsLoading } from 'selectors/vilmates-page'
import SpinnerStyled from 'components/ui/spinner'

export const CommentsList = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const comments = useShallowEqualSelector(getComments)
  const isCommentsLoading = useShallowEqualSelector(getCommentsLoading)

  useEffect(() => {
    dispatch(vilmatesPageGetCommentsRequest(userId))
  }, [])

  if (isCommentsLoading) return <SpinnerStyled />

  const renderComments = comments.length ? (
    comments.map(({ date_create, text, initiator, id }) => (
      <CommentItem
        date={date_create}
        text={text}
        key={id}
        initiator={initiator}
      />
    ))
  ) : (
    <Typography variant="h6" align="center">
      No comments yet...
    </Typography>
  )

  return <Grid container>{renderComments}</Grid>
}
