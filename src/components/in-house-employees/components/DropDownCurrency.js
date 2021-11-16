import React, { useState } from 'react'

import Currency from './Currency';


function DropDownCurrency (props) {
  const {
    currencyList
  } = props;

  return (
    <div>
      {
        currencyList.map(currency => 
          (<Currency item={currency}
                     name={currency.name}
                     rate={currency.rate}
                     key={currency.currencyId} />)
      )
      }
    </div>
  )
}
export default DropDownCurrency;