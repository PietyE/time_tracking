import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { Box, TextField } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import { vilmatesPagePostCommentsRequest } from 'actions/vilmates-page'
import { showAlert } from 'actions/alert'
import { WARNING_ALERT } from '../../../../../../constants/alert-constant'
import styles from './AddComment.module.scss'

export const AddComment = () => {
  const { userId } = useParams()
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const onChange = (event) => setText(event.target.value)

  const postComment = () => {
    if (text && text.length > 10 && text.length < 1000) {
      dispatch(vilmatesPagePostCommentsRequest({ userId, text }))
      setText('')
    } else
      dispatch(
        showAlert({
          type: WARNING_ALERT,
          title: 'Validation Error',
          message: 'Comment should be more than 10 words and less than 1000',
          delay: 4000,
        })
      )
  }

  return (
    <Box className={styles.container}>
      <Avatar name="user" size="small" />
      <TextField
        type="text"
        variant="outlined"
        placeholder="Add a comment about Larov Dmytro"
        className={styles.comment}
        value={text}
        onChange={onChange}
        onBlur={postComment}
        minRows="5"
        multiline
        fullWidth
      />
    </Box>
  )
}
