import React from 'react'
import { CardContent as CardMain, Typography } from '@material-ui/core'
import './CardContent.scss'

export const CardContent = ({ name, position, email }) => (
  <CardMain className="vilmate-card-main-content">
    <Typography
      variant="body2"
      component="p"
      className="vilmate-card-position-title"
    >
      {name}
    </Typography>
    <Typography component="p" className="vilmate-card-position-text">
      {position}
    </Typography>
    <Typography
      component="p"
      variant="body2"
      className="vilmate-card-position-email"
    >
      {email}
    </Typography>
  </CardMain>
)
