import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'

import { changeSelectedDate, addTimeReport } from 'actions/timereports'
import { getSelectedDate, getTimeReports } from 'selectors/timereports'
import './style.scss'

const projects = [
  { companyName: 'Trialhead', id: 187 },
  { companyName: 'Fundedbyme', id: 534 },
  { companyName: 'Voicera', id: 123 },
  { companyName: 'Homer', id: 987 },
  { companyName: 'iSalon', id: 125 },
  { companyName: 'Relation Desk', id: 923 },
  { companyName: 'Becocapital', id: 523 },
  { companyName: 'Rule', id: 493 },
]

function TimeReport({
  selectedDate,
  changeSelectedDate,
  reports,
  addTimeReport,
}) {
  const todayDate = new Date()

  const initialDate = {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  }

  const getDaysInMonth = date =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  let daySize = getDaysInMonth(new Date(selectedDate.year, selectedDate.month))

  if (
    selectedDate.year === todayDate.getFullYear() &&
    selectedDate.month === todayDate.getMonth()
  ) {
    daySize = todayDate.getDate()
  }

  const renderDaysArray = []

  for (let i = 0; i < daySize; i++) {
    renderDaysArray.push(i)
  }

  useEffect(() => {
    changeSelectedDate(initialDate)
  }, [])

  return (
    <div className="time_report_container container">
      <div className="time_report_header">
        <ProjectSelect menuList={projects} />
        <div className="time_report_header_btn_section">
          <SelectMonth
            selectedDate={selectedDate}
            setNewData={changeSelectedDate}
            extraClassNameContainer="time_report_header_select_month"
          />
          <button className="export_btn">
            <span className="export_icon_container">
              <DownloadIcon />
            </span>
            <span className="export_btn_text">Export</span>
          </button>
        </div>
      </div>
      <div className="time_report_body_container">
        {renderDaysArray.map((item, index) => {
          const numberOfDay = daySize - index
          const dataOfDay = reports.filter(
            report => numberOfDay === new Date(report.date).getDate()
          )
          return (
            <Day
              key={index}
              isRenderCreateForm={!index}
              numberOfDay={numberOfDay}
              selectedDate={selectedDate}
              descriptions={dataOfDay}
              addTimeReport={addTimeReport}
            />
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
  reports: getTimeReports(state),
})

const actions = { changeSelectedDate, addTimeReport }

export default connect(mapStateToProps, actions)(memo(TimeReport))
