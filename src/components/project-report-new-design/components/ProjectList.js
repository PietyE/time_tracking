import React from 'react'

import { Link } from 'react-router-dom'

function ProjectList (props) {
  const {
    name,
    hours,
    hoursOvertime,
    stateDataForLink,
    active_project,
    full_time
  } = props;

  const showHours = () => {
   if (hours) {
        return hours
    } else {
        return '0h 00m' 
    }
  }

  return (
    <>
        <div className='project_row' />
        <div className={`project_list ${(!active_project)? 'not_active_project':''}`}>
            <div className='project_name'>
                {<Link
                    to={{
                    pathname: '/timereport',
                    state: stateDataForLink,
                    }}
                >
                    {name}
                </Link>}
              </div>
            <div className='project_hours'>
              <span>{showHours()}</span>
              { (full_time && hoursOvertime) ? (<span> + { hoursOvertime}</span>) : null}
            </div>
        </div>
    </>
  )
}
export default ProjectList;