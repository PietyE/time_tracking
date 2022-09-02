import React from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { Modal } from 'components/ui/modal-mui'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { GoogleModalContent } from './components'
import {
  googleAuthErrorListToggle,
  googleAuthIsAgreeTrue,
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

  const onForcePush = () => {
    dispatch(googleAuthIsAgreeTrue())
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
      secondButton={true}
      onSecondaryClick={onForcePush}
      secondActionText="Force Push"
    >
      <Box className="modal-container-form-users-sync-list">
        <GoogleModalContent />
      </Box>
    </Modal>
  )
}
