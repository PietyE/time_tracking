import React from 'react'
import { Spinner } from 'react-bootstrap'

import './spinner.scss'

export default function SpinnerStyled() {
  return (
    <div className="spinner_container">
      <Spinner animation="border" variant="success" />
    </div>
  )
}
