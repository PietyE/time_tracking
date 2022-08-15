import React from 'react'
import { Spinner } from 'react-bootstrap'

import './spinner.scss'

export default function SpinnerStyled({ isBackgroundBlurred = true }) {
  const className = isBackgroundBlurred
    ? 'spinner_container'
    : 'spinner_container not_blurred'
  return (
    <div className={className}>
      <Spinner animation="border" variant="success" />
    </div>
  )
}
