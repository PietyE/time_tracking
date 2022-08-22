import React from 'react'
import { Box, Modal as MUIModal } from '@material-ui/core'
import { ModalHeader } from './components/ModalHeader'
import { ModalFooter } from './components/ModalFooter'
import './Modal.scss'

export const Modal = (props) => {
  const { open, title, actionText, children, onClose, onButtonClick } = props
  return (
    <MUIModal open={open} onClose={onClose}>
      <Box className="modal-container">
        <Box className="modal-container-form">
          <ModalHeader title={title} onClose={onClose} />
          {children}
          <ModalFooter actionText={actionText} onButtonClick={onButtonClick} />
        </Box>
      </Box>
    </MUIModal>
  )
}
