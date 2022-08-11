import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import styles from './RightSessionContainer.module.scss'

export const RightSessionContainer = ({ children, title }) => (
  <Box className="container" component="section">
    <Typography variant="h5">{title}</Typography>
    <Divider variant="fullWidth" />
    {children}
  </Box>
)
