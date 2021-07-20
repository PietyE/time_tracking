import React from 'react'
import { selectCurrencyList } from '../../../selectors/currency'
import { useSelector } from 'react-redux'
import Select from 'react-select'


function CurrencySelect(props) {

  const {parentHandler} = props;

  const currenciesList = useSelector(selectCurrencyList)

  const result = currenciesList
    .filter(item => item.numericCode !== '980')
    .map(item => {
      return {
        label: item.code,
        value: item.numericCode,
        serverId: item.serverId,
      }

    })

  const handleOnChange = (event) => {
    const currencyId = event.serverId;
    parentHandler(currencyId);
  }


  return (
    <Select
      options={result}
      onChange={handleOnChange}
      placeholder="choose..."
    />
  )
}

export default CurrencySelect