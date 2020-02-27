import React, { memo } from 'react'
import { connect } from 'react-redux'

import { selectProject, clearSelectedProject } from 'actions/developer-projects'
import { getProjectsSelector } from 'selectors/developer-projects'
import { getSelectedProject } from 'selectors/timereports'
import Select from 'components/ui/select'

function ProjectSelect({
  projects = [],
  selectProject,
  selectedProject,
  clearSelectedProject,
}) {
  const listItems = projects.map(item => {
    if (!item.project) {
      return {
        ...item,
        developer_project_id: item.id,
      }
    }
    return {
      ...item.project,
      developer_project_id: item.id,
    }
  })

  return (
    <Select
      title="choose you project..."
      listItems={listItems}
      onSelected={selectProject}
      valueKey="name"
      idKey="developer_project_id"
      extraClassContainer={'project_select'}
      initialChoice={selectedProject}
      onClear={clearSelectedProject}
    />
  )
}

const mapStateToProps = state => ({
  projects: getProjectsSelector(state),
  selectedProject: getSelectedProject(state),
})

const actions = { selectProject, clearSelectedProject }

export default memo(connect(mapStateToProps, actions)(ProjectSelect))
