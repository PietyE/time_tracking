import React, { useContext } from 'react'
import {ProjectReportContext} from 'context/projectReport-context'

function WorkData (props) {
  const {
    salary,
    total_hours,
    extra_costs,
    salaryPerHour,
    comments_lenght,
    openComments,
    salaryCur,
    currencyRate
  } = props;

  const contextType = useContext(ProjectReportContext);

  const onClick = (e) => {
    e.stopPropagation()
    contextType.openComments()
  }

  return (
    <div className="work_data">
      <div className="user_work_data">
        <span className="data">
          {salaryCur}{salary ? salary : "0"}
        </span>
        <span className="user_work_data_text">SALARY</span>
      </div>
      <div className="user_work_data">
        <span className="data">
            {total_hours}
        </span>
        <span className="user_work_data_text">HOURS WORKED</span>
      </div>
      <div className="user_work_data">
        <span className="data">
            {currencyRate}{salaryPerHour ? salaryPerHour : "0"}/h
        </span>
        <span className="user_work_data_text">HOURLY RATE</span>   
      </div>
      { openComments &&
        <div className="user_work_data">
          <div className="comments_counter open" onClick={onClick}>{comments_lenght}</div>
          <span className="data">
              {extra_costs ? extra_costs : "0 грн"}
          </span>
          <span className="user_work_data_text">EXTRA COSTS</span>
        </div>
      } 
      { !openComments &&
        <div className="user_work_data">
          <div className="comments_counter closed" onClick={onClick}>{comments_lenght}</div>
          <span className="data">
              {extra_costs ? extra_costs : "0 грн"}
          </span>
          <span className="user_work_data_text">EXTRA COSTS</span>
        </div>
      }
    </div>
  )
}

export default WorkData;