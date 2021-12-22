import React, { useCallback, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import TeamInput from './TeamInput'
import TeamMemberItem from './TeamMemberItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSelectedProjectIdSelector,
  getProjectName,
  getActivePmInCurrentProjectSelector, getProjectManagerListSelector, getActiveDevSelector,
  getDeactivatedMembersSelector, getSelectedProjectSelector, getIsFetchingPmPageSelector,
} from '../../../reducers/projects-management'
import { isEqual } from 'lodash'
import {
  getProjectReportById, setSelectedProject,
  changeProjectName, changeUserOnProject, addUsersOnProject, setShowEditModal,
} from '../../../actions/projects-management'
import SpinnerStyled from '../../ui/spinner'
import {showAler} from "../../../actions/alert";
import {WARNING_ALERT} from "../../../constants/alert-constant";

function EditProjectModal({ show }) {
  const dispatch = useDispatch()
  const projectName = useSelector(getProjectName, isEqual)
  let [pName, setPName] = useState('')

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
      dispatch(changeProjectName({ id, data }))
    },
    [dispatch],
  )
  const _changeUserOnProject = useCallback(
    (id, data) => {
      dispatch(changeUserOnProject({ id, data }))
    },
    [dispatch],
  )
  const _addUsersOnProject = useCallback(
    (data) => {
      dispatch(addUsersOnProject({ data }))
    },
    [dispatch],
  )

  const currentProjectId = useSelector(getSelectedProjectIdSelector, isEqual)
  const currentProject = useSelector((getSelectedProjectSelector, isEqual))

  const projectNameOnChange = (e) => {
    setPName(e?.target?.value);
  }

  useEffect(()=>{
    setPName(projectName)
      },
      [projectName])



  const projectManagersList = useSelector(getProjectManagerListSelector, isEqual)
  const activeProjectManager = useSelector(getActivePmInCurrentProjectSelector, isEqual)
  const currentProjectActiveDevelopers = useSelector(getActiveDevSelector, isEqual)
  const deactivatedUsers = useSelector(getDeactivatedMembersSelector, isEqual)

  const isFetching = useSelector(getIsFetchingPmPageSelector)

  const availableProjectManagersList = projectManagersList.filter(pm => pm?.id !== activeProjectManager?.user_id)


  const [valuesFromApi, setValuesFromApi] = useState(null)


  useEffect(() => {
    if (projectName) {
      setValuesFromApi({
        projectName: projectName,
        team: currentProjectActiveDevelopers,
        projectManager: activeProjectManager,
      })
    }
  }, [projectName, currentProjectActiveDevelopers, activeProjectManager])

  useEffect(() => {
    if (!!show) {
      if (!currentProject) {
        _getProjectReportById(currentProjectId)
      }
    }
  }, [_getProjectReportById, currentProjectId, show])

  useEffect(() => {
    if (!!currentProject) {
      _setSelectedProject(currentProject)
    }
  }, [currentProject])

  const pmInitialValue = {
    name: '',
    user_id: '',
    is_full_time: true,
    is_active: true,
  }
  let initialValues = {
    projectName: '',
    team: [],
    projectManager: pmInitialValue,
  }

  const handleClose = () => dispatch(setShowEditModal(false))

  const onSubmit = values => {
    _changeProjectName(currentProjectId, values.projectName)
  }
  return (
    <Modal
      show = {show}
      onHide = {handleClose}
      backdrop = {false}
      centered = {true}
      className='pm_page_modal'
    >
      {isFetching && <SpinnerStyled/>}
      <Modal.Header closeButton className='pm_modal_header'>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues = {valuesFromApi || initialValues}
          onSubmit = {onSubmit}
          enableReinitialize

        >
          {({ values, setFieldValue }) => {

            const handleChangePmFullTime = e => {
              _changeUserOnProject(e.target.dataset.id, { is_full_time: !values.projectManager.is_full_time })
              setFieldValue('projectManager.is_full_time', !values.projectManager.is_full_time)
            }

            const handleAddMemberToProject = e => {
              const targetUserId = e.target?.selectedOptions[0]?.dataset.id || e.id
              let isChosenE = !!values.team.filter(el => el.is_active === true).find((e)=>e.user_id === targetUserId);

              if(isChosenE){
                dispatch(showAler({
                  type: WARNING_ALERT,
                  message: `This employee already chosen`,
                  delay: 5000,
                }));
                return
              }

              const isPm = projectManagersList.find(pm => pm.id === targetUserId)

              if (isPm) {
                setFieldValue('projectManager.name', e.target.value)
                if(activeProjectManager){
                  _changeUserOnProject(activeProjectManager.projectReportId, { is_active: false })
                }
              }
              const wasDeactivated = deactivatedUsers.find(user => user.user_id === targetUserId)
              if (wasDeactivated) {
                _changeUserOnProject(wasDeactivated.projectReportId, { is_active: true })
              } else {
                _addUsersOnProject({
                  project: currentProjectId,
                  user: targetUserId,
                  is_full_time: true,
                  is_active: true,
                })
              }
            }
            return (
              <Form className = "pm_create_modal_form">
                {/*Change project name*/}
                <label className = "pm_create_modal_project_label pm_create_modal_label">
                  Project name
                  <br/>
                  <Field
                    className = "pm_create_modal_input"
                    name = "projectName"
                    placeholder = "Enter project name"
                    onChange={projectNameOnChange}
                    value={pName || ''}
                  />
                </label>

                <div className = 'pm_create_team_buttons_container pm_edit_team_button_container'>
                  <button className ={'pm_create_team_button '+(pName === projectName?'disabled':'')}
                          disabled={pName === projectName? true:false}
                          type = 'submit'>Change</button>
                </div>
                {/*Change project developers*/}

                <label className = "pm_create_modal_team_label pm_create_modal_label">
                  Team
                  <br/>
                  <TeamInput setFieldValue = {setFieldValue} values = {values} onChangeDev = {handleAddMemberToProject}
                             type = 'update'/>

                </label>
                {values.team?.length > 0 &&
                <ul>
                  {values.team.filter(el => el.is_active === true).map(el => <TeamMemberItem key = {el.user_id}
                                                                                             data = {el}
                                                                                             data-id = {el.user_id}
                                                                                             setFieldValue = {setFieldValue}
                                                                                             values = {values}
                                                                                             type = 'update'/>)}
                </ul>
                }
                {/*Change project pm*/}

                <label className = "pm_create_modal_pm_label pm_create_modal_label">
                  Project manager
                  <br/>
                  <Field
                    className = "pm_create_modal_input"
                    name = "projectManager.name"
                    as = "select"
                    onChange = {handleAddMemberToProject}
                  >
                    <option label = 'Select PM' ></option>
                    {!!availableProjectManagersList.length && availableProjectManagersList.map(pm =>
                      <option key = {pm?.id} data-id = {pm.id} value = {pm?.name}>{pm?.name}</option>,
                    )
                    }
                  </Field>
                </label>

                {/*Show selected PM*/}
                {values?.projectManager?.name &&
                <div className = 'pm_create_team_item  pm_create_team_item_pm'>

                  <span className = 'pm_create_team_text'>{values.projectManager.name}</span>

                  <label className = 'pm_create_team_checkbox_label'>
                    <Field
                      type = 'checkbox'
                      name = 'values.projectManager.is_full_time'
                      checked = {!values.projectManager?.is_full_time}
                      data-id = {values.projectManager.projectReportId}
                      onChange = {handleChangePmFullTime}
                      className = 'pm_create_team_checkbox'/>
                    Part-time
                  </label>
                </div>}

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