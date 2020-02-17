import React from 'react'

import ProjectSelect from './components/ProjectSelect'
import Day from './components/Day'
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
  console.log('render TimeReport')
  return (
    <div className="time_report_container container">
      <div className="time_report_header">
        <ProjectSelect menuList={projects} />
      </div>
      <div className="time_report_body_container">
        <Day />
      </div>
    </div>
  )
}

export default TimeReport
