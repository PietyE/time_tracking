import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectErrorFetchRatesList,
  selectIsFetchingRatesList,
  selectRateList,
} from '../../../selectors/currency'
import './rates.css'
import Spinner from '../spinner'


const ActualRates = () => {
  const rateList = useSelector(selectRateList)
  const isFetchRateList = useSelector(selectIsFetchingRatesList)
  const errorFetchRatesList = useSelector(selectErrorFetchRatesList)


  return (
    <>
      <div className='text-left d-flex'>
        <p className='rate_item m-0 py-3'>Actual rates: </p>
      {isFetchRateList && <Spinner />}
      {!isFetchRateList && errorFetchRatesList && <p className='rate_item m-0 py-3 p-3 text-danger'>An error occurred while fetching rates' list </p>}
      {!isFetchRateList && !errorFetchRatesList && (!rateList || !rateList.length) && <p className='rate_item m-0 py-3 p-3'>No data to display </p>}
      {!isFetchRateList && !errorFetchRatesList && rateList && rateList.length &&

          rateList.map((item) => {
            const { name, rate, currencyId } = item
            return (
              <p key={currencyId} className='text-left rate_item m-0 p-3'>1 {name} = {rate} UAH;</p>
            )
          })
      }
      </div>
    </>
  )
}


export default ActualRates