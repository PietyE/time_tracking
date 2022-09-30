import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'

export const ModalFooter = ({
  onButtonClick,
  actionText,
  secondButton,
  secondActionText,
  onSecondaryClick,
}) => {
  const button = secondButton ? (
    <ButtonGroup fullWidth variant="contained">
      <Button
        className="modal-container-Mui-custom-form-actions-button-primary"
        color="primary"
        onClick={onSecondaryClick}
      >
        {secondActionText}
      </Button>
      <Button
        className="modal-container-Mui-custom-form-actions-button-secondary"
        color="primary"
        fullWidth
        onClick={onButtonClick}
      >
        {actionText}
      </Button>
    </ButtonGroup>
  ) : (
    <Button
      className="modal-container-Mui-custom-form-actions-button"
      color="primary"
      onClick={onButtonClick}
    >
      {actionText}
    </Button>
  )
  return <Box className="modal-container-Mui-custom-form-actions">{button}</Box>
}
