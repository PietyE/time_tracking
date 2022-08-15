import React from 'react'
import { Box } from '@material-ui/core'
import { Graph } from './components/Graph'
import './Statistics.scss'

export const Statistics = () => (
  <Box className="vilmates-page-users-statistics-container">
    <Graph />
  </Box>
)
