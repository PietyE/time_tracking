import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import './PageHeader.scss'

export const PageHeader = () => (
  <div className="vilmate-header-container">
    <Typography variant="h3" className="vilmates-header-title">
      Vilmates
    </Typography>
    <Divider />
  </div>
)
