import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import { getAllProjectsSelector } from 'reducers/projects-management'
import { createProject, setShowCreateModal } from 'actions/projects-management'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { WARNING_ALERT } from 'constants/alert-constant'
import { showAlert } from 'actions/alert'
import Cross from 'images/ic_cros.svg'
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'
import * as Yup from 'yup'

import styles from './style.module.scss'

function CreateProjectModal({ show }) {
  const dispatch = useDispatch()

  const projects = useShallowEqualSelector(getAllProjectsSelector)

  const handleClose = useCallback(
    () => dispatch(setShowCreateModal(false)),
    [dispatch]
  )

  const _createProject = useCallback(
    (data) => {
      dispatch(createProject(data))
    },
    [dispatch]
  )

  const checkExistingProjects = useCallback(
    (projectName) => {
      return projects.find((project) => project.name === projectName)
    },
    [projects]
  )

  const validationSchema = Yup.object().shape({
    project_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name is required'),
  })

  const onSubmit = (values, resetForm) => {
    const { project_name } = values

    if (project_name) {
      const existingProject = checkExistingProjects(project_name)

      if (!existingProject) {
        const preparedData = {
          projectName: project_name,
        }
        _createProject(preparedData)
        resetForm()
        handleClose()
      } else {
        dispatch(
          showAlert({
            type: WARNING_ALERT,
            message: 'Such a name of the project already exists',
            delay: 5000,
          })
        )
      }
    }
  }

  const initialValues = {
    project_name: '',
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, resetForm)
    },
    validationSchema,
    onReset: () => {
      handleClose()
    },
  })

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={false}
      centered={true}
      className="pm_page_modal"
      id="pm-modal"
    >
      <Modal.Header className="pm_modal_header">
        <Modal.Title>Create a new project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="pm_create_modal_form">
          <div className="form-container container">
            <div className="row">
              <div className="input-cont col-12">
                <label htmlFor="">Project name</label>
                <input
                  className="project-input"
                  name="project_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.project_name}
                  placeholder="Vilmate Internal"
                  type="text"
                />
                {formik.touched.project_name && formik.errors.project_name ? (
                  <div className={'error'}>{formik.errors.project_name}</div>
                ) : null}
              </div>
            </div>
          </div>
          <button type="submit" className="pm_create_modal_form-submit">
            Create the project
          </button>
          <span className={styles.close} onClick={formik.handleReset}>
            <img src={Cross} alt="cross" />
          </span>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateProjectModal
