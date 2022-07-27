import React from 'react'
import { Button, CardActions } from '@material-ui/core'
import './CardFooter.scss'

export const CardFooter = () => (
  <CardActions>
    <Button
      fullWidth
      color="primary"
      variant="outlined"
      className="vilmate-card-footer-button"
    >
      View Profile
    </Button>
  </CardActions>
)
