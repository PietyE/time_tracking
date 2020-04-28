import React, { memo } from 'react'

import Select from 'components/ui/select'

function ProjectSelect({
  projectList,
  selectProject,
  selectedProject,
  clearSelectedProject,
}) {
  console.log('projectList', projectList)
  return (
    <Select
      title="choose you project..."
      listItems={projectList}
      onSelected={selectProject}
      valueKey="name"
      idKey="id"
      extraClassContainer={'project_select'}
      initialChoice={selectedProject}
      onClear={clearSelectedProject}
    />
  )
}

export default memo(ProjectSelect)
