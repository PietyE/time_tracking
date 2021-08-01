import React from 'react'
import { selectCurrencyList } from '../../../selectors/currency'
import { useSelector } from 'react-redux'
import Select from 'components/ui/select'

function CurrencySelect(props) {

  const {parentHandler} = props;

  const currenciesList = useSelector(selectCurrencyList)
  // console.dir(currenciesList);

  const result = currenciesList
    .filter(item => item.numericCode !== '980')
    .map(item => {
      return {
        name: item.code,
        value: item.numericCode,
        serverId: item.serverId,
      }

    })
  // console.dir(result);
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
    />
  )
}

export default CurrencySelect