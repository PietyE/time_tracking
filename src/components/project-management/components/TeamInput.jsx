import React from 'react'
import {
  getDeveloperSelector,
  getActiveDevSelector,
  getUserListSelector,
} from '../../../reducers/projects-management'
import Select from '../../ui/select';
import useEqualSelector from '../../../custom-hook/useEqualSelector'


const TeamInput = ({ setFieldValue, values, onChangeDev, type }) => {
  const users = useEqualSelector(getUserListSelector)
  const developers = useEqualSelector(getDeveloperSelector)
  const currentProjectDevelopers = useEqualSelector(getActiveDevSelector)

  let availableDevelopers = developers
  if (currentProjectDevelopers) {
     const currentActiveProjectDevelopers = currentProjectDevelopers.filter(dev => dev.is_active === true)
    const currentActiveProjectDevelopersIdArray = currentActiveProjectDevelopers.map(dev => dev.user_id)
    availableDevelopers = developers.filter(dev => !currentActiveProjectDevelopersIdArray.includes(dev.id)) || null
  }
  if(type === 'create'){
    const selectedDevId = values?.team.map(el=>el.user_id)
    availableDevelopers = developers.filter(dev=> !selectedDevId.includes(dev.id))
  }

  const handleChangeDev = e => {
    const data = e?.target?.value || e.name
    if (type === 'update') {
      onChangeDev(e)
    }
    const checkResult = values?.team?.find(el => el.name === data)
    let currentDev
    if (!checkResult) {
      currentDev = users.find(el => el.name === data)
    }
    if(values.team){
      const result = checkResult ? [...values.team] : [...values.team, {
        name: data,
        is_full_time: true,
        is_active: true,
        is_project_manager: false,
        user_id: currentDev.id,
      }]
      setFieldValue('team', result)
    availableDevelopers = availableDevelopers.filter(dev => dev?.name !== data)
    }
  }

  const onSelectItem = (data) => {
    handleChangeDev(data)
  }

  return (
      <div>
      <Select
          title="Select Team"
          listItems={users}
          valueKey="name"
          idKey="id"
          extraClassContainer={'developer_select pm_select'}
          isSearch={true}
          onSelected={onSelectItem}
          isTeamSearch={true}
          selectedTeam={values.team}
      />
    </div>
  )
}

export default TeamInput
