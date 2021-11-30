import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import usaFlag from 'images/inHouseEmployees/usaFlag.svg'
import euroFlag from 'images/inHouseEmployees/euroFlag.svg'
import ukrFlag from 'images/inHouseEmployees/ukrFlag.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'
import ukFlag from 'images/inHouseEmployees/ukFlag.svg'

import { selectRateList, selectCurrencyList } from 'selectors/currency'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import DropDownCurrency from '../DropDownCurrency/DropDownCurrency'
import "./currencySelect.scss"

function CurrencySelect (props) {
  const {
    currencyValue,
    changeSelected,
    changeSalary,
    changeHourlyRate,
    changeExtraCosts
  } = props

  const [flag, setFlag] = useState(usaFlag);
  const [currency, setCurrency] = useState("USD");
  const currenciesRateList = useShallowEqualSelector(selectRateList);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);

  useMemo(() => {
    if(selected){
      setCurrency(selected.name)
      if(currency === "EUR") {
        setFlag(euroFlag)
      } else if(currency === "UAH") {
        setFlag(ukrFlag)
      } else if (currency === "USD") {
        setFlag(usaFlag)
      } else if (currency === "GBP") {
        setFlag(ukFlag)
      } 
    }
  }, [currency, selected])

  useEffect(() => {
    if(selected && selected.rate !== currencyValue) {
      // changeSelected(selected)
    }
  }, [selected])

  useEffect(() => {
    if(currencyValue) {
      setCurrency(currencyValue)
    }
    if(currency === "EUR") {
      setFlag(euroFlag)
    } else if(currency === "UAH") {
      setFlag(ukrFlag)
    } else if (currency === "USD") {
      setFlag(usaFlag)
    } else if (currency === "GBP") {
      setFlag(ukFlag)
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
  }, [changeSelected])

  return (
    <>
      <div className={`currency  ${opened ? "open_menu" : "close_menu"} `} onClick={onOpen}>
        <img src={flag} className="flag" /> 
        <span className="currency_name">{currency}</span>
        <img src={upArrow} className="up_arrow"/>  
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