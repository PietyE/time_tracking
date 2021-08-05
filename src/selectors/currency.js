
export const selectCurrencyList = state => state.currencies.currenciesList;

export const selectRateList = state => state.currencies.ratesList;

export const selectIsFetchingRatesList = state => state.currencies.isFetchingRatesList;

export const selectErrorFetchRatesList = state => state.currencies.errorFetchRatesList;

export const selectSuccessFetchRatesList = state => state.currencies.successFetchRatesList;

