import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import './style.scss'

import { useFormik } from 'formik'

function CreateProjectModal(props) {
  // eslint-disable-next-line react/prop-types
  const { onClose, show } = props

  const onSubmit = (values, { setSubmitting }) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2))
    //   setSubmitting(false)
    // }, 400)
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      projectName: '',
      users: [],
      projectManager: '',
    },
    onSubmit,
  })

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop={false}
      centered={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            controlId='projectName'
            name='projectName'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectName}
          >
            <Form.Label>Project Name</Form.Label>
            <Form.Control type='projectName' placeholder='Enter project name' />
          </Form.Group>

          <Form.Group controlId='users'>
            <Form.Label>Team</Form.Label>
            <Form.Control as='select'>
              <option>Some name 1</option>
              <option>Some name 2</option>
              <option>Some name 3</option>
              <option>Some name 4</option>
              <option>Some name 5</option>
            </Form.Control>
          </Form.Group>


          <div>
            <div className={'selected-user'}>
              <span>Some name 1</span>
              <div className={'selected-user-controls'}>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Full-time" />
              </Form.Group>
              <span className="oi oi-x remove-user"/>
              </div>
            </div>
          </div>


          <Form.Group controlId='projectManager'>
            <Form.Label>Team</Form.Label>
            <Form.Control as='select'>
              <option>Project Manager 1</option>
              <option>Project Manager 2</option>
              <option>Project Manager 3</option>
              <option>Project Manager 4</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant='success'
            type='submit'
            disabled={isSubmitting}
            className='mr-3'
          >
            Create
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateProjectModal
