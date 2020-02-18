import React, { useState } from 'react'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
import DownloadIcon from 'components/ui/svg-components/download-icon'
import SelectMonth from 'components/ui/select-month'
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

function TimeReport() {
  const data = new Date()

  const selectedDate = {
    month: data.getMonth(),
    year: data.getFullYear(),
  }
  const [currentData, setCurrentData] = useState(selectedDate)

  const getDaysInMonth = date =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const renderDaysArray = []

  let daySize = getDaysInMonth(new Date(currentData.year, currentData.month))

  if (
    currentData.year === data.getFullYear() &&
    currentData.month === data.getMonth()
  ) {
    daySize = data.getDate()
  }

  for (let i = 0; i < daySize; i++) {
    renderDaysArray.push(i)
  }

  console.log('currentData', daySize)

  return (
    <div className="time_report_container container">
      <div className="time_report_header">
        <ProjectSelect menuList={projects} />
        <div className="time_report_header_btn_section">
          <SelectMonth
            selectedDate={currentData}
            setNewData={setCurrentData}
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
          return (
            <Day
              key={index}
              isRenderCreateForm={!index}
              dayReport={daySize - index}
              currentData={currentData}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TimeReport
