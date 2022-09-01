import React from 'react'
import { Grid } from '@material-ui/core'
import { Avatar } from 'components/ui/avatar'
import { CommentItemContent } from './components/CommentItemContent'
import { useFetchUserName } from './helpers'
import styles from './CommentItem.module.scss'

// date_create: "2022-09-01T07:58:40.341461Z"
// id: "7c0bb72e-89cd-4703-a650-ebcba2d25e77"
// initiator: "f300a302-4fa6-4552-8ba8-0dee8f3e100a"
// is_active: true
// is_updated: false
// reply: null
// text: "test comment for user from Andrii"
// user: "6fcdc8a8-db6f-40b9-b8a1-7d0397e74157"

export const CommentItem = ({ initiator, text, date }) => {
  const name = useFetchUserName(initiator)
  return (
    <Grid item xs={12} className={styles.comment_container}>
      <Avatar name={name} size="small" />
      <CommentItemContent text={text} date={date} name={name} />
    </Grid>
  )
}
