import React, { memo } from 'react'
import { connect } from 'react-redux'

import Select from 'components/ui/select'

function ProjectSelect({
  projectList,
  selectProject,
  selectedProject,
  clearSelectedProject,
}) {
  return (
    <Select
      title="choose you project..."
      listItems={projectList}
      onSelected={selectProject}
      valueKey="name"
      idKey="developer_project_id"
      extraClassContainer={'project_select'}
      initialChoice={selectedProject}
      onClear={clearSelectedProject}
    />
  )
}

export default memo(ProjectSelect)
