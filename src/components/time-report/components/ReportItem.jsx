import React, { memo, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { FaExchangeAlt } from 'react-icons/fa'
import TextareaAutosize from 'react-textarea-autosize'
import InputMask from 'react-input-mask'
import ChangeProjectModal from './ChangeProjectModal'

import {
  deleteTimeReport,
  editTimeReport,
  setEditMode,
} from 'actions/times-report'
import { parseMinToHoursAndMin } from 'utils/common'
import DeleteModal from './DeleteModal'
import Linking from 'components/common/linking'
import {
  getTimeReportForEdit,
  getIdEditingWorkItem,
} from 'selectors/timereports'

function ReportItem({
  text,
  hours,
  deleteTimeReport,
  id,
  editTimeReport,
  editableText,
  idEditingWorkItem,
  setEditMode,
  isOneProject,
}) {
  const {
    title: oldTitle,
    duration: oldDuration,
    developer_project,
    date,
  } = editableText
  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [showModalChangeProject, setShowModalChangeProject] = useState(false)

  const handlerClickOpenDeleteModal = (e) => {
    e.stopPropagation()
    setIsDeleteRequest(!isDeleteRequest)
    setEditMode(null)
  }

  const handlerClickDelete = (e) => {
    e.stopPropagation()
    deleteTimeReport(id)
    setIsDeleteRequest(false)
  }

  const handlerClickEditMode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(id)
  }

  const handlerCancelEditMode = () => {
    setEditMode(null)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const [_hour, min] = e.target.duration.value.split(':')
    const duration = _hour ? +_hour * 60 + +min : +min
    const title = e.target.title.value
    if (oldDuration !== duration || oldTitle !== title) {
      editTimeReport({
        developer_project,
        title,
        duration,
        date,
        id,
      })
    }
    setEditMode(null)
  }

  const hanldeClickToggleShowModalChangeProject = useCallback(() => {
    setShowModalChangeProject((prev) => !prev)
  }, [setShowModalChangeProject])

  const activeClassNameContainerForDeletting =
    isDeleteRequest || showModalChangeProject ? 'active' : ''
  const activeClassNameContainerForEditting =
    idEditingWorkItem === id ? 'editing' : ''

  return (
    <div
      className={`time_report_day_row full ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting}`}
    >
      {showModalChangeProject && (
        <ChangeProjectModal
          onClickClose={hanldeClickToggleShowModalChangeProject}
          editableWorkItem={editableText}
        />
      )}
      {isDeleteRequest && (
        <DeleteModal
          handlerClickOpenDeleteModal={handlerClickOpenDeleteModal}
          handlerClickDelete={handlerClickDelete}
        />
      )}
      {idEditingWorkItem === id ? (
        <form
          style={{ display: 'contents' }}
          onSubmit={handlerSubmit}
          id="edit_form"
        >
          <TextareaAutosize
            className="time_report_day_description textarea"
            defaultValue={text}
            autoFocus
            onFocus={(e) => {
              const temp_value = e.target.value
              e.target.value = ''
              e.target.value = temp_value
            }}
            name="title"
          />
          <InputMask
            placeholder="HH"
            maskPlaceholder="0"
            className="hours_input time_report_day_hours"
            mask="9:99"
            defaultValue={parseMinToHoursAndMin(hours)}
            name="duration"
          />
        </form>
      ) : (
        <>
          <span className="time_report_day_description">
            <Linking text={text} />
          </span>
          <span className="time_report_day_hours">
            {parseMinToHoursAndMin(hours)}
          </span>
        </>
      )}

      <div className="time_report_day_edit">
        <div className={'time_report_day_menu'}>
          {idEditingWorkItem !== id && isOneProject && (
            <button
              onClick={hanldeClickToggleShowModalChangeProject}
              className="button change_project_button"
              type={'button'}
              form="edit_form"
            >
              <FaExchangeAlt className="icon" />
            </button>
          )}
          <button
            onClick={
              idEditingWorkItem === id ? () => null : handlerClickEditMode
            }
            className="button edit_button"
            type={idEditingWorkItem === id ? 'submit' : 'button'}
            form="edit_form"
          >
            <FontAwesomeIcon
              icon={idEditingWorkItem === id ? faCheck : faEdit}
              className="icon pencil_icon"
            />
          </button>
          <button
            onClick={
              idEditingWorkItem === id
                ? handlerCancelEditMode
                : handlerClickOpenDeleteModal
            }
            className="button delete_button"
          >
            <FontAwesomeIcon
              icon={idEditingWorkItem === id ? faTimes : faTrashAlt}
              className="icon trash_icon"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  editableText: getTimeReportForEdit(state, ownProps.id),
  idEditingWorkItem: getIdEditingWorkItem(state),
})

const actions = {
  deleteTimeReport,
  editTimeReport,
  setEditMode,
}

export default connect(mapStateToProps, actions)(memo(ReportItem))
