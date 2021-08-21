import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectActualRates,
  selectErrorFetchRatesList,
  selectIsFetchingRatesList,
  selectRateList,
} from '../../../selectors/currency'
import './rates.css'
import { Spinner } from 'react-bootstrap'


const ActualRates = () => {
  const rateList = useSelector(selectActualRates)
  const isFetchRateList = useSelector(selectIsFetchingRatesList)
  const errorFetchRatesList = useSelector(selectErrorFetchRatesList)
  const showContent = !!(rateList && rateList.length);


  return (
    <>
      <div className='text-left d-flex'>
        <p className='rate_item m-0 py-3'>Actual rates: </p>
      {isFetchRateList &&
      <div className="spinner-small">
        <Spinner animation="border" variant="success"/>
      </div>
      }
      {!isFetchRateList && errorFetchRatesList && <p className="rate_item m-0 py-3 p-3 text-danger">An error occurred while fetching rates list</p>}
      {!isFetchRateList && !errorFetchRatesList && !showContent && <p className="rate_item m-0 py-3 p-3">No data to display</p>}
      {!isFetchRateList && !errorFetchRatesList && showContent &&
          rateList.map((item) => {
            const { name, rate, currencyId } = item
            const rateToRender = rate ? `${rate} UAH` : 'rate is not set'
            return (
              <p key={currencyId} className='text-left rate_item m-0 p-3'>1 {name} - {rateToRender};</p>
            )
          })
      }
      </div>
    </>
  )
}


export default ActualRates