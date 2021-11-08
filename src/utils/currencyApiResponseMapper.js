import {get as lodashGet} from 'lodash';

export const currencyListMapper = (response) => {
  let data = {}
  if (response && typeof response === 'object') {
    data = response
  }
  const currenciesArray = data.data
  if (!currenciesArray || !Array.isArray(currenciesArray) || !currenciesArray.length) {
    return []
  }
  return currenciesArray.reduce((previous, item) => {
    if (item && typeof item === 'object' && typeof item.code === 'string' && typeof item.id === 'string') {
      const currencyItem = {
        code: item.code,
        numericCode: item.numeric_code,
        serverId: item.id,
        sign: item.symbol,
      }
      previous.push(currencyItem)
      return previous
    }
    return previous
  }, [])
}


export const ratesListMapper = (response) => {

  const ratesArray = lodashGet(response, 'data.items', []);
  if (!ratesArray || !Array.isArray(ratesArray) || !ratesArray.length) {
    return []
  }
  const newRatesArray =  ratesArray.reduce((previous, item) => {
    if (
      item &&
      typeof item === 'object' &&
      typeof item.date === 'string' &&
      typeof item.rate === 'string' &&
      item.currency
    ) {
      const rateItem = {
        currencyId: lodashGet(item, 'currency.id', ''),
        name: lodashGet(item, 'currency.code', ''),
        date: lodashGet(item, 'date', ''),
        rate: lodashGet(item, 'rate', ''),
        isActive: lodashGet(item, 'is_active', false),
        sign: lodashGet(item, 'currency.symbol', '')
      }
      previous.push(rateItem)
      return previous
    }
    return previous
  }, [])

  return newRatesArray.filter(item => item.isActive);
}