import React, { useState } from 'react'
import { flags } from 'constants/currency-flag-constant'

function Currency (props) {
  const {item, name, rate, chooseCurrency} = props;
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(rate)

  const onClick = (e) => {
    e.stopPropagation()
    chooseCurrency(item)
  }

  return (
    <div className="currency_label" onClick={onClick}>
      <img src={flags[name]}  className="flag" alt='flags'/>
      <span className="name">{name}</span>
      <span className="dash">-</span>
      <span className="value">{value}</span>
    </div>
  )
}
export default Currency;