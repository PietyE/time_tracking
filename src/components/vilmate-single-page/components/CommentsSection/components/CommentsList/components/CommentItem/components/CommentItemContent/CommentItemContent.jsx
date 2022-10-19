import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { Box, Paper, Typography } from '@material-ui/core'
import { vilmatesPageDeleteCommentsRequest } from 'actions/vilmates-page'
import styles from './CommentItemContent.module.scss'
import useShallowEqualSelector from '../../../../../../../../../../custom-hook/useShallowEqualSelector'
import { getUserPermissions } from '../../../../../../../../../../selectors/user'
import { userPermissions } from '../../../../../../../../../../constants/permissions'

export const CommentItemContent = ({ text, date, name, id }) => {
  const dispatch = useDispatch()
  const permissions = useShallowEqualSelector(getUserPermissions)
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
        {permissions?.includes(
          userPermissions.vilmate_comments_delete_vilmatecomment
        ) && (
          <Typography
            variant="body2"
            color="error"
            className={styles.delete}
            onClick={() => handleDeleteComment(id)}
          >
            Delete
          </Typography>
        )}
      </Box>
    </Box>
  )
}
