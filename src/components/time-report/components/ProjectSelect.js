import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux'

import { getDeveloperProjects, selectProject } from 'actions/developer-projects'
import { getDeveloperProjectNames } from 'selectors/developer-projects'
import Select from 'components/ui/select'

function ProjectSelect({ projects = [], selectProject, getDeveloperProjects }) {
  const listItems = projects.map(item => ({
    ...item.project,
    developer_project_id: item.id,
  }))
  useEffect(() => {
    getDeveloperProjects()
  }, [getDeveloperProjects])

  return (
    <Select
      title="choose you project..."
      listItems={listItems}
      onSelected={selectProject}
      valueKey="name"
      idKey="developer_project_id"
      extraClassContainer={'project_select'}
    />
  )
}

const mapStateToProps = state => ({
  projects: getDeveloperProjectNames(state),
})

const actions = { getDeveloperProjects, selectProject }

export default memo(connect(mapStateToProps, actions)(ProjectSelect))
