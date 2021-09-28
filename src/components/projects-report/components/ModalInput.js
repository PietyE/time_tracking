import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import { getIsFetchingProjectsReport } from '../../../selectors/developer-projects'
import { isEqual } from 'lodash'
import { useSelector } from 'react-redux'

export const ModalInput = ({ prevValue, handleSaveChange }) => {
  console.dir(prevValue)
  const [isEdit, setIsEdit] = useState(false)
  const [value, setIsvalue] = useState(+prevValue)
  const [isFetching, setIsFetching] = useState(false)

  const fetchingStatus = useSelector(getIsFetchingProjectsReport, isEqual)

  useEffect(() => {
    if (isFetching) {
      setIsFetching(fetchingStatus)
    }
  }, [fetchingStatus])

  const handleChangeValue = (event) => {
    const filteredStr = event.target.value.replace(/[^\d+.\d]/g, '')
    if(filteredStr !== Number(prevValue)){
      setIsEdit(true)
    }
    // if(filteredStr === ''){
    //   setIsEdit(false)
    // }
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
    if (Number(value) !== Number(prevValue)) {
      handleSaveChange(value)
      setIsFetching(true)
      setIsEdit(false)
    }
  }

  return (
    <>
      <div onClick = {handleClickEditButton} className = "edit_user_modal_title_value_container">
        <input
          type = "text"
          className = "edit_user_modal_input"
          value = {value}
          onChange = {handleChangeValue}
        />
      </div>
      <div className = "edit_user_modal_button_container">
        {isFetching &&
        <div className = 'spinner-small'>
          <Spinner animation = "border" variant = "success"/>
        </div>
        }
        {isEdit && !isFetching && <>
          <button
            variant = {'success'}
            onClick = {handleClickSave}
            className = "edit_user_button save"
          >
            <FontAwesomeIcon icon = {faCheck}/>
          </button>
          <button
            variant = "secondary"
            onClick = {handlerClickCancelButton}
            className = "edit_user_button cancel"
          >
            <FontAwesomeIcon icon = {faTimes}/>
          </button>
        </>}
      </div>
    </>
  )
}

export default ModalInput
