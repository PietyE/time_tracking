import React from 'react'
import { Box } from '@material-ui/core'
import { GraphInfo } from './components/GraphInfo'
import { GraphRating } from './components/GraphRating'

export const Graph = () => (
  <Box className="vilmates-page-users-statistics-amount-container">
    <GraphInfo />
    <GraphRating />
  </Box>
)
