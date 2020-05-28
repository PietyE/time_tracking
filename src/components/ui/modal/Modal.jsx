import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

function Modal({ children }) {
  const element = document.getElementById('modal')

  useEffect(() => {
    element.classList.add('active')
    return () => {
      element.classList.remove('active')
    }
  }, [])

  return ReactDOM.createPortal(
    <div className="modal_container">{children}</div>,
    element
  )
}

export default Modal
