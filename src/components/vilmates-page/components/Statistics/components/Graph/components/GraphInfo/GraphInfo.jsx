import React from 'react'
import { Box, Typography } from '@material-ui/core'
import './GraphInfo.scss'

export const GraphInfo = ({ amount }) => (
  <Box className="vilmates-page-users-statistics-amount-main-text-container">
    <Typography
      variant="h4"
      component="p"
      className="vilmates-page-users-statistics-amount-main-text-title"
      gutterBottom
    >
      {amount}
    </Typography>
    <Typography
      variant="body2"
      component="p"
      className="vilmates-page-users-statistics-amount-main-text-subText"
    >
      Members
    </Typography>
  </Box>
)
