import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

export const ModalInput = ({ prevValue, handleSaveChange }) => {
  const [isEdit, setIsEdit] = useState(false)

  const [value, setIsvalue] = useState(+prevValue)

  const handleChangeValue = (event) => {
    setIsvalue(event.target.value)
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
          <Button
            variant="warning"
            onClick={handleClickEditButton}
            className="edit_user_button"
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              variant={'success'}
              onClick={handleClickSave}
              className="edit_user_button save"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handlerClickCancelButton}
              className="edit_user_button cancel"
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default ModalInput
