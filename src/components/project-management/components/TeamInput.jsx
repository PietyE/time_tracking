import React, { useState } from 'react'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import { getDeveloperSelector, getActiveDevSelector } from '../../../reducers/projects-management'
import { isEqual } from 'lodash'

const TeamInput = ({ setFieldValue, values, onChangeDev, type }) => {
  const [updatedAvailableDevelopers, setUpdatedAvailableDevelopers] = useState(null)

  const developers = useSelector(getDeveloperSelector, isEqual)
  const currentProjectDevelopers = useSelector(getActiveDevSelector, isEqual)
  console.log('currentProjectDevelopers', currentProjectDevelopers)
  let availableDevelopers = developers
  if (currentProjectDevelopers) {
    const currentActiveProjectDevelopers = currentProjectDevelopers.filter(dev => dev.is_active === true)
    const currentActiveProjectDevelopersIdArray = currentActiveProjectDevelopers.map(dev => dev.user_id)
    availableDevelopers = developers.filter(dev => !currentActiveProjectDevelopersIdArray.includes(dev.id)) || null
  }


  const handleChangeDev = e => {
    const data = e.target.value
    if (type === 'update') {
      onChangeDev(e)
    }
    const checkResult = values.team.find(el => el.name === data)
    let currentDev
    if (!checkResult) {
      currentDev = developers.find(el => el.name === data)
    }
    const result = !!checkResult ? [...values.team] : [...values.team, {
      name: data,
      is_full_time: true,
      is_active: true,
      user_id: currentDev.id,
    }]
    setFieldValue('team', result)
    const filteredDevelopers = availableDevelopers.filter(dev => dev?.id !== currentDev?.id)
    setUpdatedAvailableDevelopers(filteredDevelopers)
  }

  return (
    <Field
      className = "pm_create_modal_input pm_create_select"
      as = "select"
      name = "team"
      value = ''
      onChange = {handleChangeDev}
    >
      <option label = 'Select developer' disabled = {true}></option>
      {availableDevelopers.length > 0 && (updatedAvailableDevelopers || availableDevelopers).map(developer =>
        <option key = {developer.id} data-id = {developer.id} value = {developer.name}>{developer.name}</option>)}

    </Field>
  )
}

export default TeamInput