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
    <div className="projects_data">
      <span className="span_project_name">
        {<Link
                  to={{
                    pathname: '/timereport',
                    state: stateDataForLink,
                  }}
                >
                  {project.name}
                </Link>}
      </span>
      <span className="span_occupancy">{project.is_full_time ? "Full-time" : "Part-time"}</span>
      <span className="span_hours">{project.working_time}</span>
      <span className="span_total">{isNull(project.total)}</span>
    </div>
  )
}

export default Project;