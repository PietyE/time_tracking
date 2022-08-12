import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'

export const GoogleSheetFormHeader = () => (
  <Box className="google-auth-success-container-form-header">
    <Typography
      variant="h6"
      component="p"
      className="google-auth-success-container-form-header-title"
    >
      Paste the link to google sheet
    </Typography>
    <Divider variant="fullWidth" />
  </Box>
)
