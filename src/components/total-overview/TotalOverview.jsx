import React from 'react'
import { useDispatch } from 'react-redux'
import HeaderProjectReport from 'components/project-report-new-design/components/HeaderProjectReport/HeaderProjectReport'
import SelectMonth from 'components/ui/select-month'
import WorkData from 'components/project-report-new-design/components/WorkData/WorkData'
import MonthData from './components/MonthData'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { getProfileId } from 'selectors/user'
import { changeSelectedDate } from 'actions/calendar'
import './totalOverview.scss'

function TotalOverview() {
  const currentUserId = useShallowEqualSelector(getProfileId)
  const dispatch = useDispatch()

  const onSentNewData = (data) => {
    dispatch(changeSelectedDate(data))
  }

  return (
    <div className="total_overview_main_container">
      <HeaderProjectReport id={currentUserId} name="Total overview" />
      <div className="diw_row" />
      <div className="calendar">
        <SelectMonth onChange={onSentNewData} showYear />
      </div>
      <div className="data">
        <WorkData
          salary={'1000'}
          salaryCur={'$'}
          currencyRate={'$'}
          total_hours={'1000'}
          extra_costs={'1000'}
          salaryPerHour={'1000'}
          firstBlockText={'TAXES'}
          secondBlockText={'GRAND TOTAL'}
          thirdBlockText={'TRANSFERED'}
          fourthBlockText={'DEFICIT'}
        />
      </div>
      <div className="month_data">
        <MonthData title="Spent this month" />
      </div>
    </div>
  )
}

export default TotalOverview
