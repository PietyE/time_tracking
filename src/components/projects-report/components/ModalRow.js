import React from 'react'

export default function ModalRow({ direction, children }) {
  return (
    <div
      className={
        direction
          ? 'edit_user_modal_row_container column'
          : 'edit_user_modal_row_container'
      }
    >
      {children}
    </div>
  )
}
