import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

function Modal({ children }) {
  const element = document.getElementById('modal')

  const ModalComponent = () => {
    // element.classList.add('active')
    useEffect(() => {
      element.classList.add('active')
      return () => {
        element.classList.remove('active')
      }
    }, [])
    return <div className="modal_container">{children}</div>
  }

  return ReactDOM.createPortal(<ModalComponent />, element)
}

export default Modal
