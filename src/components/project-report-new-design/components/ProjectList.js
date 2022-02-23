import React, { useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom'

function ProjectList (props) {
  const {
    name,
    hours,
    stateDataForLink
  } = props;

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
            <div className='project_hours'>{hours ? hours : 'full-time'}</div>
        </div>
    </>
  )
}
export default ProjectList;