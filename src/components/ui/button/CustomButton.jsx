import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import './CustomButton.scss'

export const CustomButton = (props) => {
  const { variant, type, startIcon, onClick, children, className } = props
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      className={`custom-button ${variant} ${className}`}
    >
      {startIcon}
      <p>{children}</p>
    </Button>
  )
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  startIcon: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
