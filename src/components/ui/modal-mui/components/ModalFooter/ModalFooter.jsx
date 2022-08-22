import React from 'react'
import { Box, Button } from '@material-ui/core'

export const ModalFooter = ({ onButtonClick, actionText }) => (
  <Box className="modal-container-form-actions">
    <Button
      className="modal-container-form-actions-button"
      variant="contained"
      color="primary"
      fullWidth
      onClick={onButtonClick}
    >
      {actionText}
    </Button>
  </Box>
)
