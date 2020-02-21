import React from 'react'
import ReactDOM from 'react-dom'

import { Button } from 'react-bootstrap'

import './style.scss'

function Modal({ title, onClickClose, onClickYes, id }) {
  const ModalComponent = () => {
    const handlerClickYes = e => {
      e.stopPropagation()
      onClickYes(id)
    }
    return (
      <div className="modal_container" onClick={onClickClose}>
        <div className="overlay">
          <h5 className="title">{title}</h5>
          <div className="button_container">
            <Button onClick={handlerClickYes}>
              <span>Yes</span>
            </Button>
            <Button onClick={onClickClose}>
              <span>No</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return ReactDOM.createPortal(
    <ModalComponent />,
    document.getElementById('modal')
  )
}

export default Modal
