import React from 'react'

import { Link } from 'react-router-dom'

function ProjectList (props) {
  const {
    name,
    hours,
    stateDataForLink,
    is_full_time
  } = props;

  const showHours = () => {
    if (is_full_time) {
        return 'full-time'
    } else if (hours) {
        return hours
    } else {
        return '0h 00m' 
    }
  }

  return (
    <>
        <div className='project_row' />
        <div className='project_list'>
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
            <div className='project_hours'>{showHours()}</div>
        </div>
    </>
  )
}
export default ProjectList;