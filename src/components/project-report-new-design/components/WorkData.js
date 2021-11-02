import React, { } from 'react'

function WorkData (props) {
  const {
    total_salary,
    total_hours,
    extra_costs
  } = props;

  return (
    <div className="work_data">
      <div className="user_work_data">
        <span className="data">
          ${total_salary ? total_salary : "0"}
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
            $22,50/h
        </span>
        <span className="user_work_data_text">HOURLY RATE</span>   
      </div>
      <div className="user_work_data">
        <span className="data">
            {extra_costs ? extra_costs : "0 грн"}
        </span>
        <span className="user_work_data_text">EXTRA COSTS</span>
      </div>
    </div>
  )
}

export default WorkData;