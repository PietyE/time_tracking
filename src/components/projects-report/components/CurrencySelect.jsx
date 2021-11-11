import React from 'react'
import { selectCurrencyList } from '../../../selectors/currency'
import { useSelector } from 'react-redux'
import Select from 'components/ui/select'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

function CurrencySelect(props) {

  const {parentHandler, selectedCurrency} = props;

  const currenciesList = useShallowEqualSelector(selectCurrencyList)

  const result = currenciesList
    .filter(item => item.numericCode !== '980')
    .map(item => {
      return {
        name: item.code,
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
      title="Currencies"
      listItems={result}
      valueKey="name"
      idKey="serverId"
      onSelected={handleOnChange}
      initialChoice={selectedCurrency}
    />
  )
}

export default CurrencySelect