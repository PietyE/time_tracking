import React from 'react'
import { Box } from '@material-ui/core'
import { RightSessionContainer } from '../RightSessionsContainer'
import { AddComment } from './components/AddComment'
import { CommentsList } from './components/CommentsList'
import styles from './CommentsSection.module.scss'

export const CommentsSection = () => (
  <RightSessionContainer title="Comments" isHaveScroll={true}>
    <Box className={styles.container}>
      <AddComment />
      <CommentsList />
    </Box>
  </RightSessionContainer>
)
