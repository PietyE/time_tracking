import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { CommentItem } from './components/CommentItem'
import { useDispatch } from 'react-redux'
import { vilmatesPageGetCommentsRequest } from 'actions/vilmates-page'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getComments } from 'selectors/vilmates-page'

// date_create: "2022-09-01T07:58:40.341461Z"
// id: "7c0bb72e-89cd-4703-a650-ebcba2d25e77"
// initiator: "f300a302-4fa6-4552-8ba8-0dee8f3e100a"
// is_active: true
// is_updated: false
// reply: null
// text: "test comment for user from Andrii"
// user: "6fcdc8a8-db6f-40b9-b8a1-7d0397e74157"

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
