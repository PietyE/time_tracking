import React from 'react'
import { Box, Typography } from '@material-ui/core'

export const GraphInfo = () => (
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
)
