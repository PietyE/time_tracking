import React, { useContext, useEffect, useState } from 'react'
import {ProjectReportContext} from 'context/projectReport-context'

import './workData.scss'

function WorkData (props) {
  const {
    salary,
    total_hours,
    extra_costs,
    salaryPerHour,
    comments_lenght,
    openComments,
    salaryCur,
    currencyRate,
    firstBlockText,
    secondBlockText,
    thirdBlockText,
    fourthBlockText
  } = props;

  const contextType = useContext(ProjectReportContext);
  const [lenghtIsNull, setLenghtIsNull] = useState(false) 

  const onClick = (e) => {
    e.stopPropagation()
    contextType.openComments()
  }
  
  useEffect(() => {
    if (comments_lenght === undefined) {
      setLenghtIsNull(true)
    }
  }, [])

  return (
    <div className="work_data">
      <div className="user_work_data">
        <span className="data">
          {salaryCur}{salary ? salary : "0"}
        </span>
        <span className="user_work_data_text">{firstBlockText}</span>
      </div>
      <div className="user_work_data">
        <span className="data">
            {total_hours}
        </span>
        <span className="user_work_data_text">{secondBlockText}</span>
      </div>
      <div className="user_work_data">
        <span className="data">
            {currencyRate}{salaryPerHour ? salaryPerHour : "0"}/h
        </span>
        <span className="user_work_data_text">{thirdBlockText}</span>   
      </div>
      <div className="user_work_data">
        <div className={`comments_counter ${openComments ? "open" : "closed"} ${lenghtIsNull ? "empty" : ""}`} onClick={onClick}>{comments_lenght}</div>
        <span className="data">
            {extra_costs ? extra_costs : "0 грн"}
        </span>
        <span className="user_work_data_text">{fourthBlockText}</span>
      </div>
    </div>
  )
}

export default WorkData;