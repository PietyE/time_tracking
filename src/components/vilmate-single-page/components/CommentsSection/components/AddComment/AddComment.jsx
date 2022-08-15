import React from 'react'
import { Box, TextField } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import { useFormik } from 'formik'
import styles from './AddComment.module.scss'

export const AddComment = () => {
  const formik = useFormik({
    initialValues: {
      addComment: '',
    },
  })
  return (
    <Box className={styles.container}>
      <Avatar name="user" size="small" />
      <TextField
        type="text"
        name="addComment"
        variant="outlined"
        placeholder="Add a comment about Larov Dmytro"
        className={styles.comment}
        value={formik.values.addComment}
        onChange={formik.handleChange}
        minRows="5"
        multiline
        fullWidth
      />
    </Box>
  )
}
