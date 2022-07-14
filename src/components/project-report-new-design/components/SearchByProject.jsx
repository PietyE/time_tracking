import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getProjectsList } from 'selectors/developer-projects'
import Select from 'components/ui/select'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import { setSelectedProjectInProjectReports } from 'actions/projects-report'
import {
  getSelectDeveloperInProjectReportSelector,
  getSelectedProjectSelector,
} from 'reducers/projects-report'

const SearchByProject = () => {
  const allProjects = useShallowEqualSelector(getProjectsList)
  const selectedDeveloper = useShallowEqualSelector(
    getSelectDeveloperInProjectReportSelector
  )
  const selectedProject = useShallowEqualSelector(getSelectedProjectSelector)
  const dispatch = useDispatch()
  const onSelectedDispatch = useCallback(
    (e) => {
      dispatch(setSelectedProjectInProjectReports(e))
    },
    [dispatch]
  )

  return (
    <div>
      <Select
        title="choose your project..."
        extraClassContainer="project_select_container"
        listItems={allProjects}
        valueKey="name"
        idKey="id"
        isSearch={true}
        onSelected={onSelectedDispatch}
        disabled={selectedDeveloper.name !== 'All Developers' ? true : false}
        initialChoice={selectedProject}
      />
    </div>
  )
}

export default SearchByProject
