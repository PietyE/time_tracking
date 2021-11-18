import React, { useState, useMemo, useContext } from 'react'
import { useDispatch } from 'react-redux'

import usaFlag from 'images/inHouseEmployees/usaFlag.svg'
import euroFlag from 'images/inHouseEmployees/euroFlag.svg'
import ukrFlag from 'images/inHouseEmployees/ukrFlag.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { getCurrenciesList } from 'actions/currency'
import { selectCurrencyList, selectRateList } from 'selectors/currency'
import { InHouseEmployeesContext } from 'context/inHouseEmployees-context'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import DropDownCurrency from './DropDownCurrency'

function CurrencySelect (props) {
  const [flag, setFlag] = useState(usaFlag);
  const [currency, setCurrency] = useState("USD");
  // const [opened, setOpened] = useState(false);
  const contextType = useContext(InHouseEmployeesContext);
  const currenciesList = useShallowEqualSelector(selectRateList)

  useMemo(() => {
    if(contextType.selected){
      setCurrency(contextType.selected.name)
      if(currency === "EUR") {
        setFlag(euroFlag)
      } else if(currency === "UAH") {
        setFlag(ukrFlag)
      } else if (currency === "USD") {
        setFlag(usaFlag)
      }
    }
  }, [currency, contextType.selected])

  // const onOpen = () => {
  //   setOpened(!opened)
  // }

  const list = useMemo(() => {
    return [...currenciesList]
  }, [currenciesList])

  return (
    <>
      <div className={`currency  ${contextType.opened ? "open_menu" : "close_menu"} `} onClick={contextType.onOpenDropDown}>
        <img src={flag} className="flag" /> 
        <span className="currency_name">{currency}</span>
        <img src={upArrow} className="up_arrow"/>  
      </div>
      {!!contextType.opened &&
        <div className="drop_down_menu">
          <DropDownCurrency currencyList={list} />
        </div>
      }
    </>
  )
}
export default CurrencySelect;