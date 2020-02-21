import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'

import { getDeveloperProjects, selectProject } from 'actions/developer-projects'
import { getDeveloperProjectNames } from 'selectors/developer-projects'
import Select from 'components/ui/select'

function ProjectSelect({ projects = [], selectProject, getDeveloperProjects }) {
  const menuListOnlyName = projects.map(item => item.name)

  useEffect(() => {
    getDeveloperProjects()
  }, [getDeveloperProjects])
  return (
    <div className="project_select_container">
      <Select
        title="choose you project..."
        listItems={menuListOnlyName}
        onSelected={selectProject}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  projects: getDeveloperProjectNames(state),
})

const actions = { getDeveloperProjects, selectProject }

export default memo(connect(mapStateToProps, actions)(ProjectSelect))
