import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import InputMask from 'react-input-mask'

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

  const handleChangeExchengeRateInput = (e) => {
    setNewExchengeRate(e.target.value)
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
      <div className="project_reports_exchange_container">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Exchange rate</InputGroup.Text>
          </InputGroup.Prepend>
          <InputMask
            maskPlaceholder="_"
            className="project_reports_exchange_input"
            mask="99.99"
            value={newExchangeRate || ''}
            name="duration"
            onChange={handleChangeExchengeRateInput}
          />
          <InputGroup.Append>
            {!isEdit ? (
              <Button
                variant="warning"
                onClick={handleClickEditButton}
                className="exchange_button"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant={'success'}
                  onClick={handleSaveExchangeRate}
                  disabled={
                    prevExchangeRate === newExchangeRate || !newExchangeRate
                  }
                  className="exchange_button"
                >
                  Save
                </Button>
                <Button
                  variant="light"
                  onClick={handleClickCancel}
                  className="exchange_button"
                >
                  Cancel
                </Button>
              </>
            )}
          </InputGroup.Append>
        </InputGroup>
      </div>
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
