import React from 'react'
import { Container as MUIContainer } from '@material-ui/core'
import './Container.scss'

//size of container can be small, medium or large by default

export const Container = ({ size = 'large', align = 'left', children }) => (
  <MUIContainer className={`base-container ${size} ${align}`}>
    {children}
  </MUIContainer>
)
