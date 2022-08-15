import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import './PageHeader.scss'

export const PageHeader = ({ name }) => (
  <div className="vilmate-header-container">
    <Typography variant="h3" className="vilmates-header-title">
      {name}
    </Typography>
    <Divider />
  </div>
)
