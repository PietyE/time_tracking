import React, { useState, useEffect } from 'react'
import { flags } from 'constants/currency-flag-constant'

function Currency (props) {
  const {item, name, rate, chooseCurrency} = props;
  const [value, setValue] = useState(rate)

  const onClick = (e) => {
    e.stopPropagation()
    chooseCurrency(item)
  }

  return (
    <div className="currency_label" onClick={onClick}>
      <img src={flags[name]}  className="flag"/>
      <span className="name">{name}</span>
      <span className="dash">-</span>
      <span className="value">{value}</span>
    </div>
  )
}
export default Currency;