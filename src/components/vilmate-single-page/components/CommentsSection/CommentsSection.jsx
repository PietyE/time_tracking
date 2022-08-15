import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import { AddComment } from './components/AddComment'
import { CommentsList } from './components/CommentsList'
import { Box } from '@material-ui/core'

export const CommentsSection = () => (
  <RightSessionContainer title="Comments" isHaveScroll={true}>
    <Box style={{ padding: '0 25px' }}>
      <AddComment />
      <CommentsList />
    </Box>
  </RightSessionContainer>
)
