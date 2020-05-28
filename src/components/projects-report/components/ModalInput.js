import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'

export const ModalInput = ({ prevValue, handleSaveChange }) => {
  const [isEdit, setIsEdit] = useState(false)

  const [value, setIsvalue] = useState(+prevValue)

  const handleChangeValue = (event) => {
    const filteredStr = event.target.value.replace(/[^\d+.\d]/g, '')
    setIsvalue(filteredStr)
  }

  const handleClickEditButton = () => {
    setIsEdit(true)
  }

  const handlerClickCancelButton = () => {
    setIsvalue(+prevValue)
    setIsEdit(false)
  }

  const handleClickSave = () => {
    Number(value) !== Number(prevValue) && handleSaveChange(value)
    setIsEdit(false)
  }

  return (
    <>
      <div className="edit_user_modal_title_value_container">
        {isEdit ? (
          <input
            type="text"
            className="edit_user_modal_input"
            value={value}
            onChange={handleChangeValue}
          />
        ) : (
          <span className="edit_user_modal_input">{value}</span>
        )}
      </div>
      <div className="edit_user_modal_button_container">
        {!isEdit ? (
          <button onClick={handleClickEditButton} className="edit_user_button">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <>
            <button
              variant={'success'}
              onClick={handleClickSave}
              className="edit_user_button save"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              variant="secondary"
              onClick={handlerClickCancelButton}
              className="edit_user_button cancel"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default ModalInput
