import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Modal } from 'components/ui/modal-mui'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { GoogleModalContent } from './components'
import {
  googleAuthErrorListToggle,
  googleAuthSendGoogleSheetSyncRequest,
} from 'actions/google-auth-success'
import { isOpenErrorList } from 'selectors/google-auth-success'
import './GoogleModal.scss'

export const GoogleModal = () => {
  const isOpen = useShallowEqualSelector(isOpenErrorList)
  const dispatch = useDispatch()

  const handleToggle = () => dispatch(googleAuthErrorListToggle())
  const onSyncAgain = () => {
    dispatch(googleAuthErrorListToggle())
    dispatch(googleAuthSendGoogleSheetSyncRequest())
  }

  return (
    <Modal
      open={isOpen}
      title="Please correct the difference of users names"
      actionText="Sync again"
      onClose={handleToggle}
      onButtonClick={onSyncAgain}
    >
      <Box className="modal-container-form-users-sync-list">
        <Typography
          variant="h5"
          className="modal-container-form-users-sync-list-title"
          align="center"
        >
          Users lists
        </Typography>
        <GoogleModalContent />
      </Box>
    </Modal>
  )
}
