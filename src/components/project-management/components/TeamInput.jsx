import React from 'react'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import { getUsersSelector } from '../../../reducers/projects-management'
import { isEqual } from 'lodash'

const TeamInput = ({setFieldValue, values}) => {
  const users = useSelector(getUsersSelector, isEqual)
  const developers = users.filter(user => user.role === 1)

  const addTeamMember = data =>{
    const checkResult = values.team.find(el=>el.name === data)
    let currentDev;
    if(!checkResult){
      currentDev = developers.find(el=> el.name === data)
    }
    return !!checkResult?  [...values.team]: [...values.team, { name: data, fullTime: true, id: currentDev.id, }]
  }

  return (
    <Field
      className="pm_create_modal_input"
      as="select"
      name="team"
      value=''
      // multiple={true}
      onChange={(e) => {
        setFieldValue('team', addTeamMember(e.target.value))
      }}
    >
      <option label='Select developer' disabled={true}></option>
      {developers&&developers.map(developer=>
        <option key={developer.id} data-id={developer.id}  value ={developer.name}>{developer.name}</option>)}
    </Field>
  )
}

export default TeamInput