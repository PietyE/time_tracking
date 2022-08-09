import React from 'react'
import { CardContent as CardMain, Typography } from '@material-ui/core'

export const CardContent = ({ name, position, email }) => (
  <CardMain className="vilmate-card-main-content">
    <Typography
      color="secondary.contrastText"
      variant="body2"
      component="p"
      className="vilmate-card-position-title"
    >
      {name}
    </Typography>
    <Typography
      color="secondary.contrastText"
      component="p"
      className="vilmate-card-position-text"
    >
      {position}
    </Typography>
    <Typography
      color="secondary.contrastText"
      component="p"
      variant="body2"
      className="vilmate-card-position-email"
    >
      {email}
    </Typography>
  </CardMain>
)
