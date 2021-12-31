import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import { getIsFetchingProjectsReport } from '../../../selectors/developer-projects'
import { isEqual } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert, showAler } from '../../../actions/alert'
import { WARNING_ALERT } from '../../../constants/alert-constant'

export const ModalInput = ({
  prevValue,
  handleSaveChange,
  CisEdit,
  row,
  handleCancelChange,
}) => {
  const [isEdit, setEdit] = useState(false)
  const [value, setValue] = useState(+prevValue)
  const [isFetching, setIsFetching] = useState(false)
  const [disabledBtn, setDisabled] = useState(false)
  const dispatch = useDispatch()
  const fetchingStatus = useSelector(getIsFetchingProjectsReport, isEqual)

  useEffect(() => {
    if (isFetching) {
      setIsFetching(fetchingStatus)
    }
  }, [fetchingStatus, isFetching])

  const handleChangeValue = (event) => {
    const filteredStr = event.target.value.replace(/[^\d+.]/g, '')

    if (filteredStr !== Number(prevValue)) {
      setEdit(true)
    }

    if (filteredStr.length > 6) {
      dispatch(
        showAler({
          type: WARNING_ALERT,
          title: 'Fields can not be empty',
          message:
            'Make sure there are no more than 6 characters in the field.',
          delay: 5000,
        })
      )
      setDisabled(true)
      return
    } else {
      setDisabled(false)
      dispatch(hideAlert())
    }
    // if(filteredStr === ''){
    //   setIsEdit(false)
    // }
    setValue(filteredStr)
  }

  const handleClickEditButton = () => {
    setEdit(true)
  }

  const handleClickSave = () => {
    if (Number(value) !== Number(prevValue) || CisEdit) {
      handleSaveChange(value)
      setIsFetching(true)
      setEdit(false)
    }
  }

  const handleCancel = (row) => {
    handleCancelChange && handleCancelChange(row)
    setEdit(false)
  }

  return (
    <>
      <div
        onClick={handleClickEditButton}
        className="edit_user_modal_title_value_container"
      >
        <input
          type="text"
          className="edit_user_modal_input"
          value={value}
          onChange={handleChangeValue}
        />
      </div>
      <div className="edit_user_modal_button_container">
        {isFetching && (
          <div className="spinner-small">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {(isEdit || (CisEdit && CisEdit[row] === row)) && !isFetching && (
          <>
            <button
              // variant={'success'}
              onClick={handleClickSave}
              className={
                'edit_user_button save ' + (disabledBtn ? 'disabled' : '')
              }
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              // variant="secondary"
              onClick={() => {
                handleCancel(row)
              }}
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
