import React, { useState, useEffect } from 'react'
import { InputGroup } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalTitle from './ModalTitle'
import ModalRow from './ModalRow'

const TotalValue = (props) => {
  const {
    selectedDate,
    totalUsd,
    totalUah,
    setExchangeRates,
    prevExchangeRate,
  } = props

  const [isEdit, setIsEdit] = useState(false)
  const [newExchangeRate, setNewExchengeRate] = useState('')

  const handleSaveExchangeRate = () => {
    const data = {
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: newExchangeRate,
    }
    setExchangeRates(data)
    setIsEdit(false)
  }

  const handleChangeExchengeRateInput = (event) => {
    const filteredStr = event.target.value.replace(/[^0-9\\.]/gi, '')
    setNewExchengeRate(filteredStr)
  }

  const handleClickEditButton = () => {
    setIsEdit(true)
  }

  const handleClickCancel = () => {
    setNewExchengeRate(prevExchangeRate || '')
    setIsEdit(false)
  }

  const usdFormat = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
  })

  const UAHFormat = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  })

  useEffect(() => {
    setNewExchengeRate(prevExchangeRate || '')
  }, [prevExchangeRate])

  return (
    <div className="project_reports_total_container">
      <ModalRow>
        <ModalTitle title="Exchange rate: " />

        {!isEdit ? (
          <span className="project_reports_exchange_input">
            {newExchangeRate || ''}
          </span>
        ) : (
          <input
            className="project_reports_exchange_input"
            value={newExchangeRate || ''}
            onChange={handleChangeExchengeRateInput}
          />
        )}
        <div className="edit_user_modal_button_container">
          {!isEdit ? (
            <button
              onClick={handleClickEditButton}
              className="edit_user_button"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveExchangeRate}
                disabled={
                  prevExchangeRate === newExchangeRate || !newExchangeRate
                }
                className="edit_user_button save"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                onClick={handleClickCancel}
                className="edit_user_button cancel"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
          )}
        </div>
      </ModalRow>
      {totalUsd && totalUah && (
        <div className="project_reports_total_values_container">
          <span className="project_reports_total_value usd">
            Total USD:
            <span> {usdFormat.format(totalUsd)}</span>
          </span>
          <span className="project_reports_total_value">
            Total UAH:
            <span> {UAHFormat.format(totalUah)}</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default TotalValue
