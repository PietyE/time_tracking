import React, { useCallback } from 'react'
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
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { isEqual } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { WARNING_ALERT } from '../../../constants/alert-constant'
import { showAler } from '../../../actions/alert'

function CreateProjectModal({ show }) {
  const dispatch = useDispatch()

  const projectManagers = useSelector(getProjectManagerListSelector, isEqual)

  const projects = useSelector(getProjectsList, shallowEqual)

  const _createProject = useCallback(
    (data) => {
      dispatch(createProject(data))
    },
    [dispatch]
  )

  const checkExistingProjects = (data) => {
    return projects.find((project) => project.name === data)
  }

  const handleClose = () => dispatch(setShowCreateModal(false))

  const onSubmit = (values) => {
    const { projectName, projectManager, team } = values
    if (projectManager.name === '') {
      dispatch(
        showAler({
          type: WARNING_ALERT,
          message: 'Project Manager should be chosen',
          delay: 5000,
        })
      )
      return
    }

    if (projectName === '') {
      dispatch(
        showAler({
          type: WARNING_ALERT,
          message: `The project can't be created with an empty "Project Name"`,
          delay: 5000,
        })
      )
      return
    }

    if (!team.length) {
      dispatch(
        showAler({
          type: WARNING_ALERT,
          message: `The project can't be created with an empty "Team"`,
          delay: 5000,
        })
      )
      return
    }

    if (projectName) {
      const existingProject = checkExistingProjects(projectName)

      if (!existingProject) {
        let users = values.team

        if (values.projectManager.name) {
          const preparedPm = projectManager
          const currentProjectManager = projectManagers.find(
            (pm) => pm.name === values.projectManager?.name
          )
          preparedPm.user_id = currentProjectManager.id
          users = [...values.team, preparedPm]
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
                  >
                    <option label="Select PM" disabled={true}></option>
                    {freeProjectManagers &&
                      freeProjectManagers.map((pm) => (
                        <option key={pm.id} value={pm.name}>
                          {pm.name}
                        </option>
                      ))}
                  </Field>
                  <span className="pm_create_modal_input_arrow">&#8250;</span>
                </label>
                {values.projectManager.name && (
                  <div className="pm_create_team_item  pm_create_team_item_pm">
                    <span className="pm_create_team_text">
                      {values.projectManager.name}
                    </span>

                    <label className="pm_create_team_checkbox_label">
                      <Field
                        type="checkbox"
                        name="values.projectManager.is_full_time"
                        checked={!values.projectManager?.is_full_time}
                        onChange={() =>
                          setFieldValue(
                            'projectManager.is_full_time',
                            !values.projectManager.is_full_time
                          )
                        }
                        className="pm_create_team_checkbox"
                      />
                      Part-time
                    </label>

                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      onClick={() =>
                        setFieldValue('projectManager', pmInitialValue)
                      }
                      className="pm_create_team_close"
                    />
                  </div>
                )}

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
