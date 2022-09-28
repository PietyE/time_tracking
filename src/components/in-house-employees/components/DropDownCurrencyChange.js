import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setExchangeRates } from 'actions/projects-report'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import CurrencySelect from './CurrencySelect/CurrencySelect'
import { getSelectedDate } from 'selectors/calendar'
import check from 'images/inHouseEmployees/check.svg'

// eslint-disable-next-line no-unused-vars
function DropDownCurrencyChange(props) {
  const [selected, setSelected] = useState(null)
  const [currencyValue, setCurrencyValue] = useState(0)
  const [currentCurrencyId, setCurrentCurrencyId] = useState(null)
  const selectedDate = useShallowEqualSelector(getSelectedDate)
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selected && selected.rate !== currencyValue) {
      setCurrencyValue(selected.rate)
      setCurrentCurrencyId(selected.currencyId)
    }
    if (selected && currencyValue !== selected.rate) {
      setOpened(true)
    } else {
      setOpened(false)
    }
  }, [currencyValue, selected])

  useEffect(() => {
    if (selected && currencyValue !== selected.rate) {
      setOpened(true)
    } else {
      setOpened(false)
    }
  }, [currencyValue, selected])

  const changeValue = useCallback((e) => {
    if (e.target.value >= 0) {
      setCurrencyValue(e.target.value)
    }
  }, [])

  const changeCurrencySelected = (currency) => {
    if (currency) {
      setSelected(currency)
    }
  }

  const clearInput = () => {
    setCurrencyValue('')
    setCurrentCurrencyId(null)
    setOpened(false)
  }

  const handleSaveExchangeRate = () => {
    const data = {
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: currencyValue,
      currency: currentCurrencyId,
    }
    dispatch(setExchangeRates(data, clearInput))
    setOpened(false)
  }

  return (
    <>
      <div className="selected_currency">
        <CurrencySelect changeSelected={changeCurrencySelected} />
      </div>
      <div className="row">
        <svg
          width="10"
          height="2"
          viewBox="0 0 10 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="10" height="1.5" fill="#616161" />
        </svg>
      </div>
      <input
        type="number"
        className="currency_value"
        value={currencyValue}
        onChange={changeValue}
      />
      {opened && (
        <div className="check_button">
          <img
            src={check}
            className="check"
            onClick={handleSaveExchangeRate}
            alt="save exchange rate"
          />
        </div>
      )}
      {!opened && (
        <div className="check_button_disabled">
          <img src={check} className="check" alt="check button disabled" />
        </div>
      )}
    </>
  )
}
export default DropDownCurrencyChange
