import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import { getDevelopersList } from 'selectors/developers';

import Select from 'components/ui/select'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { setSelectedDeveloper } from 'actions/projects-report';
import { getSelectDeveloperInProjectReportSelector, getSelectedProjectSelector } from 'reducers/projects-report';

function SearchByDeveloper () {
  const allDevelopers = useShallowEqualSelector(getDevelopersList);
  const selectedDeveloper = useShallowEqualSelector(getSelectDeveloperInProjectReportSelector);
  const selectedProject = useShallowEqualSelector(getSelectedProjectSelector);
  const dispatch = useDispatch();
  const onSelectedDispatch = useCallback((e) => {
    dispatch(setSelectedDeveloper(e))
   }, [])

  return (
    <div>
        <Select
              title="choose developer..."
              extraClassContainer="developer_select_container"
              listItems={allDevelopers}
              valueKey="name"
              idKey="id"
              isSearch={true}
              onSelected={onSelectedDispatch}
              disabled={selectedProject.name !== 'All Projects' ? true : false}
              initialChoice={selectedDeveloper}
            />
    </div>
  )
}

export default SearchByDeveloper;