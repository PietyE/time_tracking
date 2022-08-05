import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { ReactComponent as StatisticArrow } from 'images/vilmates/StatisticArrow.svg'
import './GraphRating.scss'

export const GraphRating = () => (
  <Box className="vilmates-page-users-statistics-amount-actions-container">
    <Typography color="primary" variant="body1" component="p">
      +8
    </Typography>
    <StatisticArrow />
  </Box>
)
