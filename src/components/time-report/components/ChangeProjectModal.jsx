import React, { useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { isEqual, isEmpty } from 'lodash'

import CustomModal from 'components/ui/modal'
import ProjectSelect from './ProjectSelect'
import { getSelectedProject } from 'selectors/timereports'
import { getProjectsSelector } from 'selectors/developer-projects'
import { editTimeReport } from 'actions/times-report'

const ChangeProjectModal = ({ onClickClose, editableWorkItem }) => {
  const dispatch = useDispatch()
  const currentProject = useSelector(getSelectedProject, isEqual)
  const projects = useSelector(getProjectsSelector, isEqual)

  const [selectedProject, setSelectedProject] = useState({})

  const filteredProject = useMemo(
    () => projects.filter((item) => item?.id !== currentProject?.id),
    [currentProject, projects]
  )

  const changeProjectSubmit = useCallback(() => {
    dispatch(
      editTimeReport({
        ...editableWorkItem,
        developer_project: selectedProject?.developer_project_id,
      })
    )
    onClickClose();
  }, [dispatch, editableWorkItem, selectedProject, onClickClose])

  return (
    <CustomModal>
      <Modal.Dialog>
        <Modal.Header closeButton onHide={onClickClose}>
          <Modal.Title>Changing project for work item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="change_project_body_container">
            <span className="change_project_body_current_project">
              from <strong>{currentProject?.name}</strong> to{' '}
            </span>
            <ProjectSelect
              projectList={filteredProject}
              selectProject={setSelectedProject}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={isEmpty(selectedProject)}
            onClick={changeProjectSubmit}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </CustomModal>
  )
}

export default ChangeProjectModal
