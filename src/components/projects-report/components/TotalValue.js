import React, { useState, useEffect } from 'react'
import { InputGroup, Spinner } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import ModalTitle from './ModalTitle'
import ModalRow from './ModalRow'
import CurrencySelect from './CurrencySelect'
import { useSelector } from 'react-redux'
import { selectIsFetchingRatesList } from '../../../selectors/currency'

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
  const [selectedCurrency, setCurrency] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)

  const isFetchRateList = useSelector(selectIsFetchingRatesList)

  const handleSaveExchangeRate = () => {
    if (!formIsValid) {
      return;
    }
    const data = {
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: newExchangeRate,
      currency: selectedCurrency
    }
    setExchangeRates(data, clearInput)
    setIsEdit(false)
  }

  const handleChangeExchengeRateInput = (event) => {
    const filteredStr = event.target.value.replace(/[^0-9\\.]/gi, '')
    setNewExchengeRate(filteredStr)
  }

  const handleChangeCurrency = (data) => {
    setCurrency(data)
  }

  const handleClickEditButton = () => {
    setIsEdit(true)
  }

  const handleClickCancel = () => {
    setNewExchengeRate(prevExchangeRate || '')
    setIsEdit(false)
  }

  const clearInput = () => {
    setNewExchengeRate('')
    setCurrency(null)
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

  useEffect( () => {
    const status = !!(selectedCurrency && newExchangeRate && prevExchangeRate !== newExchangeRate);
    setFormIsValid (
      status
    );
  }, [selectedCurrency, newExchangeRate])

  useEffect(()=>{
    handleClickCancel();
    clearInput();
  },[selectedDate])

  return (
    <>
    <div className="project_reports_total_container">
      <ModalRow>
        <ModalTitle title="Exchange rate: " />
        {isFetchRateList &&
        <div className="spinner-small">
          <Spinner animation="border" variant="success"/>
        </div>
        }
        {!isFetchRateList &&
        <div onClick={handleClickEditButton} className="total_container_select_input d-flex">
          <CurrencySelect
            parentHandler={handleChangeCurrency}
            selectedCurrency={selectedCurrency}
          />
          <input
            className="project_reports_exchange_input"
            value={newExchangeRate || ''}
            onChange={handleChangeExchengeRateInput}
          />

        </div>
        }

        <div className="edit_user_modal_button_container">
          {!isEdit ? null : (
            <>
              {formIsValid && (
                <button
                  onClick={handleSaveExchangeRate}
                  disabled={
                    prevExchangeRate === newExchangeRate || !newExchangeRate
                  }
                  className="edit_user_button save"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              )}

              { !formIsValid && (
                <button className="edit_user_button save btn btn-secondary btn-lg disabled">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              )}

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

    </>
  )
}

export default TotalValue
