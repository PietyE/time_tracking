import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { ReactComponent as StatisticArrow } from 'images/vilmates/StatisticArrow.svg'
import './Graph.scss'

export const Graph = () => (
  <Box className="vilmates-page-users-statistics-amount-container">
    <Box className="vilmates-page-users-statistics-amount-main-text-container">
      <Typography
        variant="h4"
        component="p"
        className="vilmates-page-users-statistics-amount-main-text-title"
        gutterBottom
      >
        150
      </Typography>
      <Typography
        variant="body2"
        component="p"
        className="vilmates-page-users-statistics-amount-main-text-subText"
      >
        Members
      </Typography>
    </Box>
    <Box className="vilmates-page-users-statistics-amount-actions-container">
      <Typography color="primary" variant="body1" component="p">
        +8
      </Typography>
      <StatisticArrow />
    </Box>
  </Box>
)
