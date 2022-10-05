import React from 'react'
import { Spinner } from 'react-bootstrap'

import './spinner.scss'

export default function SpinnerStyled({
  isBackgroundBlurred = true,
  fullScreenBlurred = false,
}) {
  const blurredFull = fullScreenBlurred ? 'full' : ''
  const className = isBackgroundBlurred
    ? 'spinner_container'
    : 'spinner_container not_blurred'
  return (
    <div className={`${className} ${blurredFull}`}>
      <Spinner animation="border" variant="success" />
    </div>
  )
}
