import React from 'react'
import { CardContent as CardMain, Typography } from '@material-ui/core'
import './CardContent.scss'

export const CardContent = ({ name, position }) => (
  <CardMain className="vilmate-card-main-content">
    <Typography
      color="secondary.contrastText"
      variant="body2"
      component="p"
      className="vailmate-card-position-title"
    >
      {name}
    </Typography>
    <Typography
      color="secondary.contrastText"
      component="p"
      className="vailmate-card-position-text"
    >
      {position}
    </Typography>
  </CardMain>
)
