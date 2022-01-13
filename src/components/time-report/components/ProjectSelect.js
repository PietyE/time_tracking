import React, { memo } from 'react'

import Select from 'components/ui/select'

function ProjectSelect(props) {
  const { projectList, selectProject, selectedProject, clearSelectedProject } =
    props

  return (
    <Select
      title="choose your project..."
      listItems={projectList}
      onSelected={selectProject}
      valueKey="name"
      idKey="id"
      extraClassContainer={'project_select'}
      initialChoice={selectedProject ||{}}
      onClear={clearSelectedProject}
      disabled={!projectList?.length}
    />
  )
}

export default memo(ProjectSelect)
