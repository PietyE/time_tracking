import React, { memo, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faPencilAlt,
  faTrashAlt,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import InputMask from 'react-input-mask'

import { deleteTimeReport, editTimeReport } from 'actions/times-report'
import { parseMinToHoursAndMin } from 'utils/common'
import DeleteModal from './DeleteModal'
import Linking from 'components/common/linking'
import { getTimeReportForEdit } from 'selectors/timereports'

function ReportItem({
  text,
  hours,
  deleteTimeReport,
  id,
  editTimeReport,
  editableText,
}) {
  const {
    title: oldTitle,
    duration: oldDuration,
    developer_project,
    date,
  } = editableText
  const containerRef = useRef()
  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [isEditingText, setIsEditingText] = useState(false)

  const handlerClickOpenDeleteModal = e => {
    e.stopPropagation()
    if (isEditingText) {
      setIsEditingText(!isEditingText)
      return false
    }
    setIsDeleteRequest(!isDeleteRequest)
  }

  const handlerClickDelete = e => {
    e.stopPropagation()
    deleteTimeReport(id)
    setIsDeleteRequest(false)
  }

  const handlerClickEditMode = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditingText(true)
  }

  const handlerSaveEditedDescription = e => {
    if (
      e.relatedTarget &&
      (e.relatedTarget.parentElement.dataset.id === id ||
        e.relatedTarget.dataset.id === id)
    ) {
      return
    }
    const name = e.target.dataset.name
    switch (name) {
      case 'title':
        const title = e.target.value
        if (oldTitle !== title) {
          editTimeReport({
            developer_project,
            title,
            oldDuration,
            date,
            id,
          })
        }
        break
      case 'duration':
        const [_hour, min] = e.target.value.split(':')
        const duration = _hour ? +_hour * 60 + +min : +min
        if (oldDuration !== duration) {
          editTimeReport({
            developer_project,
            oldTitle,
            duration,
            date,
            id,
          })
        }
        break

      default:
        break
    }
    setIsEditingText(false)
  }

  const handlerSubmit = e => {
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
    setIsEditingText(false)
  }

  const activeClassNameContainerForDeletting = isDeleteRequest ? 'active' : ''
  const activeClassNameContainerForEditting = isEditingText ? 'editing' : ''

  return (
    <div
      className={`time_report_day_row full ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting}`}
      data-id={id}
      ref={containerRef}
      tabIndex={0}
    >
      {isDeleteRequest && (
        <DeleteModal
          handlerClickOpenDeleteModal={handlerClickOpenDeleteModal}
          handlerClickDelete={handlerClickDelete}
        />
      )}
      {isEditingText ? (
        <form
          style={{ display: 'contents' }}
          onSubmit={handlerSubmit}
          id="edit_form"
          data-id={id}
        >
          <TextareaAutosize
            className="time_report_day_description textarea"
            defaultValue={text}
            onBlur={handlerSaveEditedDescription}
            autoFocus
            onFocus={e => {
              const temp_value = e.target.value
              e.target.value = ''
              e.target.value = temp_value
            }}
            data-name="title"
            name="title"
          />
          <InputMask
            placeholder="HH"
            maskPlaceholder="0"
            className="hours_input time_report_day_hours"
            mask="99:99"
            defaultValue={parseMinToHoursAndMin(hours)}
            name="duration"
            onBlur={handlerSaveEditedDescription}
            data-name="duration"
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

      <div className="time_report_day_edit" data-id={id}>
        <div className={'time_report_day_menu'} data-id={id}>
          <button
            onClick={isEditingText ? () => null : handlerClickEditMode}
            className="button edit_button"
            type={isEditingText ? 'submit' : 'button'}
            form="edit_form"
          >
            <FontAwesomeIcon
              icon={isEditingText ? faCheck : faPencilAlt}
              className="icon pencil_icon"
            />
          </button>
          <button
            onClick={handlerClickOpenDeleteModal}
            className="button delete_button"
          >
            <FontAwesomeIcon
              icon={isEditingText ? faTimes : faTrashAlt}
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
})

const actions = {
  deleteTimeReport,
  editTimeReport,
}

export default memo(connect(mapStateToProps, actions)(ReportItem))
