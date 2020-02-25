import React from 'react'
import { Button } from 'react-bootstrap'

import Modal from 'components/ui/modal'

function DeleteModal({ handlerClickOpenDeleteModal, handlerClickDelete }) {
  return (
    <Modal onClickClose={handlerClickOpenDeleteModal}>
      <div className="delete_modal_overlay">
        <h5 className="delete_modal_title">
          Are you sure that you want to delete this report?
        </h5>
        <div className="delete_modal_button_container">
          <Button onClick={handlerClickDelete}>
            <span>Yes</span>
          </Button>
          <Button onClick={handlerClickOpenDeleteModal}>
            <span>No</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
