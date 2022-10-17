import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { Box, TextField, Typography } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import { vilmatesPagePostCommentsRequest } from 'actions/vilmates-page'
import { ReactComponent as PostComment } from 'images/PostComment.svg'
import styles from './AddComment.module.scss'

export const AddComment = ({ name }) => {
  const { userId } = useParams()
  const [text, setText] = useState('')
  const [validationError, setValidationError] = useState(false)
  const dispatch = useDispatch()

  const onChange = (event) => setText(event.target.value)

  const postComment = () => {
    if (text && text.length > 10 && text.length < 1000) {
      dispatch(vilmatesPagePostCommentsRequest({ userId, text }))
      setValidationError(false)
      setText('')
    } else setValidationError(true)
  }

  const className = !validationError ? styles.comment : styles.commentError

  return (
    <>
      <Box className={styles.container}>
        <Avatar name="user" size="small" />
        <TextField
          type="text"
          variant="outlined"
          placeholder={`Add a comment about ${name}`}
          className={className}
          value={text}
          onChange={onChange}
          minRows="5"
          multiline
          fullWidth
          InputProps={{
            endAdornment: (
              <Box
                className={styles.commentButtonContainer}
                onClick={postComment}
              >
                <PostComment />
              </Box>
            ),
          }}
        />
      </Box>
      {validationError && (
        <Typography color="error" align="center" className={styles.error}>
          Comment should be more than 10 words and less than 1000
        </Typography>
      )}
    </>
  )
}
