import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'
import DeveloperSelect from './components/DeveloperSelect'

import { changeSelectedDate, addTimeReport } from 'actions/timereports'
import { selectProject } from 'actions/developer-projects'
import {
  getSelectedDate,
  getTimeReports,
  getIsFetchingReport,
} from 'selectors/timereports'
import Spinner from 'components/ui/spinner'

import './style.scss'

function TimeReport({
  selectedDate,
  changeSelectedDate,
  reports,
  addTimeReport,
  isFetchingReports,
}) {
  const [showEmpty, setShowEmpty] = useState(true)

  const todayDate = new Date()

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

  return (
    <>
      {isFetchingReports && <Spinner />}
      <div
        className={
          isFetchingReports
            ? 'time_report_container container fetching'
            : 'time_report_container container'
        }
      >
        <div className="time_report_header">
          <div className="time_report_header_select_section">
            <ProjectSelect />
            <DeveloperSelect />
          </div>
          <div className="time_report_header_btn_section">
            <SelectMonth
              selectedDate={selectedDate}
              setNewData={changeSelectedDate}
              extraClassNameContainer="time_report_header_select_month"
            />
            <Button className="export_btn">
              <span className="export_icon_container">
                <DownloadIcon />
              </span>
              <span className="export_btn_text">Export</span>
            </Button>
          </div>
        </div>
        <div className="time_repord_checkbox">
          <label>
            <input
              type="checkbox"
              onChange={() => setShowEmpty(!showEmpty)}
              value={showEmpty}
            />
            <span>Hide Empty Days</span>
          </label>
        </div>
        <div className="time_report_body_container">
          {!!reports ? (
            renderDaysArray.map((item, index) => {
              const numberOfDay = daySize - index
              const dataOfDay = reports.filter(
                report => numberOfDay === new Date(report.date).getDate()
              )
              const isOpenCreate =
                todayDate.getDate() === numberOfDay &&
                todayDate.getMonth() === selectedDate.month &&
                todayDate.getFullYear() === selectedDate.year
              return (
                <Day
                  key={index}
                  numberOfDay={numberOfDay}
                  selectedDate={selectedDate}
                  descriptions={dataOfDay}
                  addTimeReport={addTimeReport}
                  showEmpty={showEmpty}
                  isOpenCreate={isOpenCreate}
                />
              )
            })
          ) : (
            <div>Please, choose your project...</div>
          )}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  selectedDate: getSelectedDate(state),
  reports: getTimeReports(state),
  isFetchingReports: getIsFetchingReport(state),
})

const actions = {
  changeSelectedDate,
  addTimeReport,
  selectProject,
}

export default memo(connect(mapStateToProps, actions)(TimeReport))
