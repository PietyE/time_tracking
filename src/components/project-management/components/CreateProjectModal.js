import React from 'react'
import { Modal } from 'react-bootstrap'
import TeamMemberItem from './TeamMemberItem'
import TeamInput from './TeamInput'
import { getUsersSelector } from '../../../reducers/projects-management'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { isEqual } from 'lodash'

function CreateProjectModal({ onClose, show }) {
  const users = useSelector(getUsersSelector, isEqual)
  const projectManagers = users.filter(user => user.role === 4)

  const onSubmit = (values) => {
    console.log('values', values)
  }
  const initialValues = {
    projectName: '',
    team: [],
    projectManager: '',
  }

  return (
    <Modal
      show = {show}
      onHide = {onClose}
      backdrop = {false}
      centered = {true}
    >
      <Modal.Header closeButton>
        <Modal.Title>New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className = "pm_create_modal_form">
              <label className="pm_create_modal_project_label pm_create_modal_label">
                Project name
                <br />
                <Field
                  className="pm_create_modal_input"
                  name="projectName"
                  placeholder="Enter project name"
                />
              </label>
              <label className="pm_create_modal_team_label pm_create_modal_label">
                Team
                <br />
                <TeamInput setFieldValue={setFieldValue} values={values}/>

                </label>
              {values.team.length>0&&
              <ul>
                {values.team.map(el => <TeamMemberItem key={el.id} data={el} setFieldValue={setFieldValue} values={values}/>)}
              </ul>
              }
              <label className="pm_create_modal_pm_label pm_create_modal_label">
                Project manager
                <br />
                <Field
                  className="pm_create_modal_input"
                  name="projectManager"
                  as="select"
                >
                    <option label='Select PM' disabled={true}></option>
                    {projectManagers&&projectManagers.map(pm=>
                      <option key={pm.id} value ={pm.name }>{pm.name}</option>)
                    }
                </Field>

              </label>
              {/*{values.projectManager&&<div className='pm_create_team_item  pm_create_team_item_pm'>*/}
              {/*  <span className='pm_create_team_text'>{values.projectManager}</span>*/}
              {/*  <FontAwesomeIcon icon={faTimesCircle} onClick={()=>setFieldValue('projectManager', '')} className='pm_create_team_close' />*/}
              {/*</div>}*/}
              <div className='pm_create_team_buttons_container'>
                <button className='pm_create_team_button' >Cancel</button>
                <button className='pm_create_team_button ' type='submit'>Create</button>
              </div>


            </Form>

          )
          }


        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default CreateProjectModal
