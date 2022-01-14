import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Field, Form, Formik } from 'formik'
import TeamInput from './TeamInput'
import TeamMemberItem from './TeamMemberItem'
import { useDispatch } from 'react-redux'
import {
  getSelectedProjectIdSelector,
  getProjectName,
  getActivePmInCurrentProjectSelector,
  getProjectManagerListSelector,
  getActiveDevSelector,
  getDeactivatedMembersSelector,
  getSelectedProjectSelector,
  getIsFetchingPmPageSelector,
} from '../../../reducers/projects-management'
import {
  getProjectReportById,
  setSelectedProject,
  changeProjectName,
  changeUserOnProject,
  addUsersOnProject,
  setShowEditModal,
} from '../../../actions/projects-management'
import SpinnerStyled from '../../ui/spinner'

import * as Yup from 'yup';
import cn from 'classnames';
import useEqualSelector from '../../../custom-hook/useEqualSelector'

function EditProjectModal({ show, projectList }) {
  const dispatch = useDispatch();
  const form = useRef(null);

  const _getProjectReportById = useCallback(
    (data) => {
      dispatch(getProjectReportById(data))
    },
    [dispatch]
  )
  const _setSelectedProject = useCallback(
    (data) => {
      dispatch(setSelectedProject(data))
    },
    [dispatch]
  )
  const _changeProjectName = useCallback(
    (id, data) => {
      dispatch(changeProjectName({ id, data }))
    },
    [dispatch]
  )
  const _changeUserOnProject = useCallback(
    (id, data) => {
      dispatch(changeUserOnProject({ id, data }))
    },
    [dispatch]
  )
  const _addUsersOnProject = useCallback(
    (data) => {
      dispatch(addUsersOnProject({ data }))
    },
    [dispatch]
  )

  const currentProjectId = useEqualSelector(getSelectedProjectIdSelector)
  const currentProject = useEqualSelector(getSelectedProjectSelector)
  const projectName = useEqualSelector(getProjectName)
  const projectManagersList = useEqualSelector(getProjectManagerListSelector)
  const activeProjectManager = useEqualSelector(getActivePmInCurrentProjectSelector)
  const currentProjectActiveDevelopers = useEqualSelector(getActiveDevSelector)
  const deactivatedUsers = useEqualSelector(getDeactivatedMembersSelector)
  const isFetching = useEqualSelector(getIsFetchingPmPageSelector)

  const availableProjectManagersList = projectManagersList.filter(
    (pm) => pm?.id !== activeProjectManager?.user_id
  )

  const [valuesFromApi, setValuesFromApi] = useState(null)

  const filteredProjects = useMemo(
    () => projectList.filter(project => project !== projectName),
    [projectName, projectList],
  )

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
    if (show) {
      if (!currentProject) {
        _getProjectReportById(currentProjectId)
      }
    }
  }, [_getProjectReportById, currentProjectId, show, currentProject])

  useEffect(() => {
    if (currentProject) {
      _setSelectedProject(currentProject)
    }
  }, [currentProject, _setSelectedProject])

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

  const validationSchema = Yup.object().shape({
    projectName: Yup.string()
      .trim()
      .required('Project Name field is required.')
      .max(50, 'The project name can\'t be longer, than 50 symbols.')
      .matches(/^[а-яА-Яa-zA-Z0-9]/gmi, 'Invalid name for project.')
      .matches(/[а-яА-Яa-zA-Z0-9,.\-_!?]/gmi, 'Invalid name for project.')
      .test('projectName', 'Invalid name for project.', (value) => !value?.match(/[^а-яА-Яa-zA-Z0-9,.\-_!? ]/gmi))
      .notOneOf(filteredProjects, 'The project with the same name exists.')
  });

  const handleClose = () => dispatch(setShowEditModal(false))

  const onSubmit = (values) => {
    _changeProjectName(currentProjectId, values.projectName.trim())
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={false}
      centered={true}
      animation={false}
      className="pm_page_modal"
    >
      <Modal.Header closeButton className="pm_modal_header">
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!!isFetching && <SpinnerStyled />}

        <Formik
          initialValues={valuesFromApi || initialValues}
          validationSchema={validationSchema}
          innerRef={form}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isValid , errors}) => {
            const handleChangePmFullTime = (e) => {
              _changeUserOnProject(e.target.dataset.id, {
                is_full_time: !values.projectManager.is_full_time,
              })
              setFieldValue(
                'projectManager.is_full_time',
                !values.projectManager.is_full_time
              )
            }

            const handleAddMemberToProject = (e) => {
              const targetUserId = e.target?.selectedOptions[0].dataset.id || e.id

              if (e.target?.name === 'projectManager.name') {
                const isPm = projectManagersList.find(
                  (pm) => pm.id === targetUserId
                )

                if (isPm) {
                  setFieldValue('projectManager.name', e.target.value)
                  if (activeProjectManager) {
                    _changeUserOnProject(activeProjectManager.projectReportId, {
                      is_active: false,
                    })
                  }
                }
              }

              const wasDeactivated = deactivatedUsers&&deactivatedUsers?.find(
                (user) => user.user_id === targetUserId
              )
              if (wasDeactivated) {
                _changeUserOnProject(wasDeactivated.projectReportId, {
                  is_active: true,
                })
              } else {
                _addUsersOnProject({
                  project: currentProjectId,
                  user: targetUserId,
                  is_full_time: true,
                  is_active: true,
                })
              }
            }

            const isSameProject = values.projectName === valuesFromApi?.projectName

            return (
              <Form className="pm_create_modal_form">
                {/*Change project name*/}
                <label className="pm_create_modal_project_label pm_create_modal_label">
                  Project name
                  <br />
                  <Field
                    className={cn(
                      'pm_create_modal_input',
                      errors?.projectName && 'pm_create_modal_colored_border',
                    )}
                    name="projectName"
                    placeholder="Enter project name"
                  />
                  <div className="pm_error_message_block">
                    {errors?.projectName && (
                      <span className="pm_name_error_message">{errors.projectName}</span>
                  )}
                  </div>
                </label>

                <div className="pm_create_team_buttons_container pm_edit_team_button_container">
                  <button
                    className={!isValid || isSameProject ? 'pm_create_team_button_disable' : 'pm_create_team_button'}
                    type="submit"
                    disabled={!isValid || isSameProject}
                  >
                    Change
                  </button>
                </div>
                {/*Change project developers*/}

                <label className="pm_create_modal_team_label pm_create_modal_label">
                  Team
                  <br />
                  <TeamInput
                    setFieldValue={setFieldValue}
                    values={values}
                    onChangeDev={handleAddMemberToProject}
                    type="update"
                  />
                </label>
                {values.team?.length > 0 && (
                  <ul>
                    {values.team
                      .filter((el) => el.is_active === true)
                      .map((el) => (
                        <TeamMemberItem
                          key={el.user_id}
                          data={el}
                          data-id={el.user_id}
                          setFieldValue={setFieldValue}
                          values={values}
                          type="update"
                        />
                      ))}
                  </ul>
                )}
                {/*Change project pm*/}

                <label className="pm_create_modal_pm_label pm_create_modal_label">
                  Project manager
                  <br />
                  <Field
                    className="pm_create_modal_input"
                    name="projectManager.name"
                    as="select"
                    onChange={handleAddMemberToProject}
                  >
                    <option label="Select PM"/>
                    {!!availableProjectManagersList.length &&
                      availableProjectManagersList.map((pm) => (
                        <option key={pm?.id} data-id={pm.id} value={pm?.name}>
                          {pm?.name}
                        </option>
                      ))}
                  </Field>
                </label>
                {values?.projectManager?.name && (
                  <div className="pm_create_team_item  pm_create_team_item_pm">
                    <span className="pm_create_team_text">
                      {values.projectManager.name}
                    </span>

                    <label className="pm_create_team_checkbox_label">
                      <Field
                        type="checkbox"
                        name="values.projectManager.is_full_time"
                        checked={!values.projectManager?.is_full_time}
                        data-id={values.projectManager.projectReportId}
                        onChange={handleChangePmFullTime}
                        className="pm_create_team_checkbox"
                      />
                      Part-time
                    </label>
                  </div>
                )}
              </Form>
            )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default EditProjectModal
