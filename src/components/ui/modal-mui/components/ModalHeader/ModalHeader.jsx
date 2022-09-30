import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import { ReactComponent as Close } from 'images/ic_cros.svg'

export const ModalHeader = ({ onClose, title }) => (
  <Box className="modal-container-Mui-custom-form-header">
    <Typography
      variant="h6"
      component="p"
      className="modal-container-Mui-custom-form-header-title"
    >
      {title}
    </Typography>
    <Divider variant="fullWidth" />
    <Close onClick={onClose} />
  </Box>
)
