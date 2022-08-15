import React from 'react'
import { RightSessionContainer } from '../RightSessionsContainer'
import { AddComment } from './components/AddComment'

export const CommentsSection = () => (
  <RightSessionContainer title="Comments">
    <AddComment />
  </RightSessionContainer>
)
