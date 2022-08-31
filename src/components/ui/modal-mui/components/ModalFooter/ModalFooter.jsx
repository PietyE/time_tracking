import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'

export const ModalFooter = ({
  onButtonClick,
  actionText,
  secondButton,
  secondActionText,
}) => {
  const button = secondButton ? (
    <ButtonGroup fullWidth variant="contained">
      <Button
        className="modal-container-form-actions-button-primary"
        color="primary"
        onClick={onButtonClick}
      >
        {secondActionText}
      </Button>
      <Button
        className="modal-container-form-actions-button-secondary"
        color="primary"
        fullWidth
        onClick={onButtonClick}
      >
        {actionText}
      </Button>
    </ButtonGroup>
  ) : (
    <Button
      className="modal-container-form-actions-button"
      color="primary"
      onClick={onButtonClick}
    >
      {actionText}
    </Button>
  )
  return <Box className="modal-container-form-actions">{button}</Box>
}
