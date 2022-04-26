import React, { useState, useMemo, useEffect, useCallback } from 'react'

import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { selectRateList } from 'selectors/currency'

import { flags } from 'constants/currency-flag-constant'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import DropDownCurrency from '../DropDownCurrency/DropDownCurrency'
import './currencySelect.scss'

function CurrencySelect (props) {
  const {
    currencyValue,
    changeSelected,
    changeSalary,
    changeHourlyRate,
    changeExtraCosts
  } = props

  const [currency, setCurrency] = useState('USD');
  const currenciesRateList = useShallowEqualSelector(selectRateList);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if(selected){
      setCurrency(selected.name)
    }
  }, [currency, selected])

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if(selected && selected.rate !== currencyValue) {
    }
  }, [currencyValue, selected])

  useEffect(() => {
    if(currencyValue) {
      setCurrency(currencyValue)
    }
  }, [currencyValue, currency])

  const list = useMemo(() => {
    return [...currenciesRateList]
  }, [currenciesRateList])

  const onOpen = (e) => {
    e.stopPropagation()
    setOpened(!opened)
  }

  const buttonRouteTo = useCallback((item) => {
    if (item) {
      setSelected(item)
      if(changeSelected) {
        changeSelected(item)
      }
      if(changeSalary) {
        changeSalary(item)
      }
      if(changeHourlyRate) {
        changeHourlyRate(item)
      }
      if(changeExtraCosts) {
        changeExtraCosts(item)
      }
    }
  }, [changeExtraCosts, changeHourlyRate, changeSalary, changeSelected])

  return (
    <>
      <div className={`currency  ${opened ? 'open_menu' : 'close_menu'} `} onClick={onOpen}>
        <img src={flags[currency]} className="flag" alt="flags"/> 
        <span className="currency_name">{currency}</span>
        <img src={upArrow} className="up_arrow" alt="arrow"/>  
      </div>
      {!!opened &&
        <div className="drop_down_menu">
          <DropDownCurrency currencyList={list} chooseCurrency={buttonRouteTo} />
        </div>
      }
    </>
  )
}
export default CurrencySelect;