import React, { useState, useMemo, useContext } from 'react'

import usaFlag from 'images/inHouseEmployees/usaFlag.svg'
import euroFlag from 'images/inHouseEmployees/euroFlag.svg'
import ukrFlag from 'images/inHouseEmployees/ukrFlag.svg'
import ukFlag from 'images/inHouseEmployees/ukFlag.svg'

import { InHouseEmployeesContext } from 'context/inHouseEmployees-context'


function Currency (props) {
  const {item, name, rate, chooseCurrency} = props;
  const [flag, setFlag] = useState(null);
  const [value, setValue] = useState(rate)
  const contextType = useContext(InHouseEmployeesContext);

  const onClick = (e) => {
    e.stopPropagation()
    chooseCurrency(item)
  }
  
  useMemo(() => {
    if(name === "EUR") {
      setFlag(euroFlag)
    } else if(name === "UAH") {
      setFlag(ukrFlag)
    } else if (name === "USD") {
      setFlag(usaFlag)
    } else if (name === "GBP") {
      setFlag(ukFlag)
    }
    // if(rate < 0){
    //   setValue('0')
    // }
  }, [name])

  return (
    <div className="currency_label" onClick={onClick}>
      <img src={flag}  className="flag"/>
      <span className="name">{name}</span>
      <span className="dash">-</span>
      <span className="value">{value}</span>
    </div>
  )
}
export default Currency;