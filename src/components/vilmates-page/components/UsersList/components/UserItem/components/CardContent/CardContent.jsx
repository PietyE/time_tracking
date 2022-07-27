import React from 'react'
import { CardContent as CardMain, Typography } from '@material-ui/core'

export const CardContent = () => (
  <CardMain>
    <Typography gutterBottom variant="h5" component="div">
      Lizard
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica
    </Typography>
  </CardMain>
)
