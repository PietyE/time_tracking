import React, { } from 'react'
import { Link } from 'react-router-dom'

function Project (props) {
  const { project, stateDataForLink } = props;

  const isNull = (value) => {
    if (value > 0) {
      return ('$' + value)
    } else {
      return ('-')
    }
  }
  
  return (
    <div className="all_projects_data">
      <div className="project_name">
        <div className="name">
        {<Link
                  to={{
                    pathname: '/timereport',
                    state: stateDataForLink,
                  }}
                >
                  {project.name}
                </Link>}
        </div>        
      </div>
      <div className="occupancy">{project.is_full_time ? "Full-time" : "Part-time"}</div>
      <div className="hours">{project.working_time}</div>
      <div className="total">{isNull(project.total)}</div>
    </div>
  )
}

export default Project;