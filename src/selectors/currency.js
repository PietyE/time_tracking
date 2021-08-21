export const selectCurrencyList = state => state.currencies.currenciesList

export const selectRateList = state => state.currencies.ratesList

export const selectIsFetchingRatesList = state => state.currencies.isFetchingRatesList

export const selectErrorFetchRatesList = state => state.currencies.errorFetchRatesList


export const selectActualRates = (state) => {
  const currencies = selectCurrencyList(state)
  const rates = selectRateList(state)

  if (!currencies.length || !rates.length) {
    return []
  }
  const ratesObj = rates.reduce((prev, item) => {
    const { rate, currencyId, name } = item;
    prev[name] = rate;
    return prev;
  }, {});

  return currencies.reduce((prev, item) => {
      const { code, serverId } = item
      if (code === 'UAH') {
        return prev
      }
      const mappedRate = {
        name: code,
        currencyId: serverId,
        rate: null,
      }
      const rate = ratesObj[code]
      if (rate) {
        mappedRate.rate = rate
      }
      prev.push(mappedRate)
      return prev
    }, [],)
}

