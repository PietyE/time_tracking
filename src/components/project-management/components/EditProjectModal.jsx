import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import TeamInput from './TeamInput'
import TeamMemberItem from './TeamMemberItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {getSelectedProjectIdSelector,getProjectsWithReportSelector,getProjectName,getActiveUsersSelector} from '../../../reducers/projects-management'
import { isEqual } from 'lodash'
import { getProjectReportById,setSelectedProject, changeProjectName,changeUsersOnProject } from '../../../actions/projects-management'

function EditProjectModal({ onClose, show }) {
  const dispatch = useDispatch()

  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch],
  )
  const _setSelectedProject = useCallback(
    (data) => {
      dispatch(setSelectedProject(data))
    },
    [dispatch],
  )
  const _changeProjectName = useCallback(
    (id, data) => {
      dispatch(changeProjectName({id:id, data: data}))
    },
    [dispatch],
  )
  const _changeUsersOnProject= useCallback(
    (id, data) => {
      dispatch(changeUsersOnProject({id:id, data: data}))
    },
    [dispatch],
  )

  const currentProjectId = useSelector(getSelectedProjectIdSelector,isEqual)
  const projectsWithReport = useSelector(getProjectsWithReportSelector, isEqual)
  let currentProject =useCallback(projectsWithReport.find(project=>project.projectId === currentProjectId),[projectsWithReport,currentProjectId])
  const projectName = useSelector(getProjectName, isEqual)
  const team = useSelector(getActiveUsersSelector, isEqual)

  const [valuesFromApi, setValuesFromApi] = useState(null)

  useEffect(()=>{
    if(projectName){
      setValuesFromApi({
        projectName: projectName,
        team:team,
      })
    }
  },[projectName, team])

  useEffect(() => {
    if(!!show){
      if(!currentProject){
        _getProjectReportById(currentProjectId)
      }
      }
  }, [_getProjectReportById, currentProjectId,show])

  useEffect(()=>{
    if(!!currentProject){
      _setSelectedProject(currentProject)
    }
  },[currentProject])

  let initialValues = {
    projectName:'',
    team: [],
  }

  const onSubmit = values =>{
    // _changeProjectName(currentProjectId, values.projectName)
    console.log('values', values)
    _changeUsersOnProject(currentProjectId, values.team)
  }
  return (
    <Modal
      show = {show}
      onHide = {onClose}
      backdrop = {false}
      centered = {true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={ valuesFromApi || initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            console.dir( values)
            return (
              <Form className = "pm_create_modal_form">
                <label className = "pm_create_modal_project_label pm_create_modal_label">
                  Project name
                  <br/>
                  <Field
                    className = "pm_create_modal_input"
                    name = "projectName"
                    placeholder = "Enter project name"
                  />
                </label>
                <label className = "pm_create_modal_team_label pm_create_modal_label">
                  Team
                  <br/>
                  <TeamInput setFieldValue = {setFieldValue} values = {values}/>

                </label>
                {values.team?.length > 0 &&
                <ul>
                  {values.team.map(el => <TeamMemberItem key = {el.user_id} data = {el} setFieldValue = {setFieldValue}
                                                         values = {values}/>)}
                </ul>
                }
                {/*<label className="pm_create_modal_pm_label pm_create_modal_label">*/}
                {/*  Project manager*/}
                {/*  <br />*/}
                {/*  <Field*/}
                {/*    className="pm_create_modal_input"*/}
                {/*    name="projectManager.name"*/}
                {/*    as="select"*/}
                {/*  >*/}
                {/*    <option label='Select PM' disabled={true}></option>*/}
                {/*    {projectManagers&&projectManagers.map(pm=>*/}
                {/*      <option key={pm.id} value ={pm.name }>{pm.name}</option>)*/}
                {/*    }*/}
                {/*  </Field>*/}

                {/*</label>*/}
                {/*{values.projectManager.name &&*/}
                {/*<div className='pm_create_team_item  pm_create_team_item_pm'>*/}

                {/*  <span className='pm_create_team_text'>{values.projectManager.name}</span>*/}

                {/*  <label className='pm_create_team_checkbox_label'>*/}
                {/*    <Field*/}
                {/*      type='checkbox'*/}
                {/*      name='values.projectManager.is_full_time'*/}
                {/*      checked={!values.projectManager?.is_full_time}*/}
                {/*      onChange={() => setFieldValue("projectManager.is_full_time", !values.projectManager.is_full_time)}*/}
                {/*      className='pm_create_team_checkbox'/>*/}
                {/*    Part-time*/}
                {/*  </label>*/}

                {/*  <FontAwesomeIcon icon={faTimesCircle} onClick={()=>setFieldValue('projectManager', pmInitialValue)}*/}
                {/*                   className='pm_create_team_close' />*/}
                {/*</div>}*/}

                {/*<div className='pm_create_team_buttons_container'>*/}
                {/*  <button className='pm_create_team_button' type='button' onClick={onClose} >Cancel</button>*/}
                <button className = 'pm_create_team_button ' type = 'submit'>Create</button>
                {/*</div>*/}
              </Form>
            )
          }
          }


        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default EditProjectModal