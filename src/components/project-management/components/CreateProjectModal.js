import React, { useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'
import TeamMemberItem from './TeamMemberItem'
import TeamInput from './TeamInput'
import { getProjectManagerListSelector } from '../../../reducers/projects-management'
import { getProjectsList } from 'selectors/developer-projects'
import {
  createProject,
  setShowCreateModal,
} from '../../../actions/projects-management'
import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { WARNING_ALERT } from '../../../constants/alert-constant'
import { showAler } from '../../../actions/alert'
import useEqualSelector from '../../../custom-hook/useEqualSelector'

function CreateProjectModal({ show }) {
  const dispatch = useDispatch()

  const [selectedPm, setSelectedPm] = useState([]);

  const projectManagers = useEqualSelector(getProjectManagerListSelector)
  const projects = useEqualSelector(getProjectsList)

  const _createProject = useCallback(
    (data) => {
      dispatch(createProject(data))
    },
    [dispatch]
  )

  const checkExistingProjects = useCallback(
    (projectName) => {
      return projects.find((project) => project.name === projectName)
    }, [projects]
  )

  const handleClose = useCallback(
    () => dispatch(setShowCreateModal(false)),
    [dispatch]
  )

  const onSubmit = useCallback((values) => {
      const { projectName, team } = values;
      let errorMessage = '';

      if (!selectedPm.length) {
        errorMessage = 'Project Manager should be chosen';
      }

      if (!projectName) {
        errorMessage = 'Enter the name of the project';
      }

      if(projectName){
        if (!projectName.match(/^[а-яА-Яa-zA-Z0-9]/gm)
          || !projectName.match(/[а-яА-Яa-zA-Z0-9,.\-_!?]/gmi)
          || projectName.match(/[^а-яА-Яa-zA-Z0-9,.\-_!? ]/gmi)
        ) {
          errorMessage = 'Invalid name for project.';
        }
      }

      if (projectName.length > 50) {
        errorMessage = 'The project name can\'t be longer, than 50 symbols.';
      }

      if (!team.length) {
        errorMessage = 'The project can\'t be created with an empty "Team"';
      }

      if (errorMessage) {
        dispatch(showAler({
          type: WARNING_ALERT,
          message: errorMessage,
          delay: 5000,
        }));
        return;
      }

      if (projectName) {
        const existingProject = checkExistingProjects(projectName)

        if (!existingProject) {
          let users = values.team

          if (selectedPm.length) {
            const preparedPm = selectedPm.map(({ id, is_full_time, name }) => ({
              user_id: id,
              name,
              is_full_time,
            }))
            users = [...values.team, ...preparedPm]
          }

          const preparedData = {
            projectName: projectName,
            users: users,
          }
          _createProject(preparedData)
          handleClose()
        } else {
          dispatch(
            showAler({
              type: WARNING_ALERT,
              message: 'Such a name of the project already exists',
              delay: 5000,
            })
          )
        }
      }
    }, [handleClose, selectedPm, _createProject, checkExistingProjects, dispatch]
  )
  const handleSelectPm = (e) => {
    e.persist()
    const targetUserId = e.target?.selectedOptions[0].dataset.id || e.id

    setSelectedPm(prev => {
      if (prev.some(item => item.id === targetUserId)) return prev;

      return [
        ...prev,
        {
          id: targetUserId,
          name: e?.target?.selectedOptions[0].value,
          is_full_time: true,
        },
      ]
    })
  }
  const pmInitialValue = {
    name: '',
    user_id: '',
    is_full_time: true,
  }
  const initialValues = {
    projectName: '',
    team: [],
    projectManager: pmInitialValue,
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={false}
      centered={true}
      className="pm_page_modal"
    >
      <Modal.Header closeButton className="pm_modal_header">
        <Modal.Title>New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => {
            const freeProjectManagers = projectManagers.filter(
              (pm) => pm.name !== values?.projectManager?.name
            )
            return (
              <Form className="pm_create_modal_form">
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
                  <TeamInput
                    setFieldValue={setFieldValue}
                    values={values}
                    type="create"
                  />
                  <span className="pm_create_modal_input_arrow">&#8250;</span>
                </label>
                {values.team.length > 0 && (
                  <ul>
                    {values.team.map((el) => (
                      <TeamMemberItem
                        key={el.user_id}
                        data={el}
                        setFieldValue={setFieldValue}
                        values={values}
                      />
                    ))}
                  </ul>
                )}
                <label className="pm_create_modal_pm_label pm_create_modal_label">
                  Project manager
                  <br />
                  <Field
                    className="pm_create_modal_input"
                    name="projectManager.name"
                    as="select"
                    value=""
                    onChange={handleSelectPm}
                  >
                    <option label="Select PM" disabled={true}/>
                    {!!freeProjectManagers.length &&
                      freeProjectManagers.map((pm) => (
                        <option key={pm.id} data-id={pm.id} value={pm?.name}>
                          {pm.name}
                        </option>
                      ))}
                  </Field>
                  <span className="pm_create_modal_input_arrow">&#8250;</span>
                </label>
                {!!selectedPm.length && selectedPm.map((pm) => (
                    <div
                      key={`PM_NAME${pm?.id}`}
                      className="pm_create_team_item  pm_create_team_item_pm"
                    >
                      <span className="pm_create_team_text">
                        {pm?.name}
                      </span>

                      <div className="pm_checkbox_and_remove_block">
                        <label className="pm_create_team_checkbox_label">
                          <Field
                            type="checkbox"
                            name="values.projectManager.is_full_time"
                            checked={!pm.is_full_time}
                            onChange={() => {
                              setSelectedPm(prev => {
                                return prev.map(item => {
                                  if (item.id !== pm.id) return item

                                  return { ...item, is_full_time: !item.is_full_time }
                                })
                              })
                            }
                            }
                            className="pm_create_team_checkbox"
                          />
                          Part-time
                        </label>

                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          onClick={() =>
                            setSelectedPm(prev => prev.filter(item => item.id !== pm.id))
                          }
                          className="pm_create_team_close"
                        />
                      </div>
                    </div>
                  ))}

                <div className="pm_create_team_buttons_container">
                  <button
                    className="pm_create_team_button"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button className="pm_create_team_button " type="submit">
                    Create
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default CreateProjectModal
