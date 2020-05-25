import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave, faCheck } from '@fortawesome/free-solid-svg-icons'

export const ModalInput = ({
  value,
  handleChangeInput,
  prevValue,
  handleCancelChanged,
  handleSaveChange,
}) => {
  return (
    <span className="input_container">
      <span>
        <input
          className="edit_user_modal_input"
          type="text"
          value={value}
          onChange={handleChangeInput}
        />
        {+value !== +prevValue && (
          <span className="input_buttons_container">
            <span className="save_button" onClick={handleSaveChange}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className="cancel_button" onClick={handleCancelChanged}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </span>
        )}
      </span>
    </span>
  )
}

export default ModalInput
