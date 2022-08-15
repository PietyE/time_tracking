import {
  deleteTimeReport,
  editTimeReport,
  setEditMode
} from 'actions/times-report'
import React, { memo, useCallback, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {
  getIdEditingWorkItem, getTimeReportForEdit
} from 'selectors/timereports'
import { parseMinToHoursAndMin } from 'utils/common'
import ChangeProjectModal from './ChangeProjectModal'
import DeleteModal from './DeleteModal'

import useMenuPresent from 'custom-hook/useMenuPresent'

import { showAlert } from '../../../actions/alert'
import { DANGER_ALERT, WARNING_ALERT } from '../../../constants/alert-constant'
import ReportItemForm from './ReportItemForm'
import { ReportItemMenu } from './ReportItemMenu'

const CLASS_NAME_DRAGING_WORK_ITEM = 'draging'
const CLASS_NAME_SHADOW_WORK_ITEM = 'shadow'
const CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY = 'below'
const CLASS_NAME_CONTAINER_DAY_CSS_SELECTOR = '.time_report_day_container'

const addClassNameBelowDayContainer = (_day) => {
  document
    .querySelectorAll(CLASS_NAME_CONTAINER_DAY_CSS_SELECTOR)
    .forEach((n) => {
      if (n.classList.contains(CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY)) {
        n.classList.remove(CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY)
      }
      if (n.dataset.day === _day) {
        n.classList.add(CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY)
      }
    })
}

const removeClassNameBelowDayContainer = () => {
  document
    .querySelectorAll(CLASS_NAME_CONTAINER_DAY_CSS_SELECTOR)
    .forEach((n) => {
      if (n.classList.contains(CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY)) {
        n.classList.remove(CLASS_NAME_BELOW_DRAGING_WORK_ITEM_DAY)
      }
    })
}

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
  showAlert,
  index,
  setDraganDroped,
  draganDroped,
}) {
  const {
    title: oldTitle,
    duration: oldDuration,
    developer_project,
    date,
  } = editableText

  const containerRef = useRef(null)

  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [showModalChangeProject, setShowModalChangeProject] = useState(false)

  const [textInputValue, setTextInputValue] = useState(text)
  const [timeInputValue, setTimeInputValue] = useState(
    parseMinToHoursAndMin(hours)
  )
  const [isTextInputError, setIsTextInputError] = useState(false)
  const [isTimeInputError, setIsTimeInputError] = useState(false)
  const [isDraggable, setIsDraggable] = useState(true)

  const [editMenu, handlerOpenMenu] = useMenuPresent()

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
  const handleChangeTextInputValue = (e) => {
    setTextInputValue(e.target.value)
    setIsTextInputError(false)
  }

  const handleChangeTimeInputValue = (e) => {
    setTimeInputValue(e.target.value)
    setIsTimeInputError(false)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const [_hour, min] = timeInputValue.split(':')
    const duration = _hour ? +_hour * 60 + +min : +min

    if (textInputValue.length === 0 && duration === 0) {
      setIsTextInputError(true)
      setIsTimeInputError(true)
      showAlert({
        type: DANGER_ALERT,
        title: 'Fields can not be empty',
        message: 'Fields can not be empty',
        delay: 5000,
      })
      return
    }

    if (textInputValue.length === 0) {
      setIsTextInputError(true)
      showAlert({
        type: DANGER_ALERT,
        message: 'Fields Task can not be empty',
        delay: 5000,
      })
      return
    }

    if (duration === 0) {
      setIsTimeInputError(true)
      showAlert({
        type: WARNING_ALERT,
        message: "Worked time can't be 0",
        delay: 5000,
      })
      return
    }

    if (duration > 480) {
      setIsTimeInputError(true)
      showAlert({
        type: WARNING_ALERT,
        message: "Worked time can't be more 8 hours",
        delay: 5000,
      })
      return
    }
    if (duration % 15 !== 0) {
      setIsTimeInputError(true)
      showAlert({
        type: WARNING_ALERT,
        message: 'The value must be a multiple of 15',
        delay: 5000,
      })
      return
    }

    if (oldDuration !== duration || oldTitle !== textInputValue) {
      setIsTimeInputError(true)
      editTimeReport({
        developer_project,
        title: textInputValue,
        duration,
        date,
        id,
      })
    }
    setEditMode(null)
    setIsTimeInputError(false)
  }

  const hanldeClickToggleShowModalChangeProject = useCallback(() => {
    setShowModalChangeProject((prev) => !prev)
  }, [setShowModalChangeProject])

  const handleInputFocus = () => {
    setIsDraggable(false)
  }

  const handleInputBlur = () => {
    setIsDraggable(true)
  }

  const activeClassNameContainerForDeletting =
    isDeleteRequest || showModalChangeProject ? 'active' : ''
  const activeClassNameContainerForEditting =
    idEditingWorkItem === id ? 'editing' : ''

  const handleDragAndDrop = (event) => {
    if (
      event.target.classList.contains('time_report_day_edit') ||
      event.target.parentNode.classList.contains('time_report_day_edit') ||
      event.target.parentNode.classList.contains('edit_dots') ||
      event.target.parentNode.classList.contains('svg-inline--fa') ||
      event.target.parentElement.classList.contains('time_report_day_menu') ||
      event.target.parentElement.classList.contains('edit-form') ||
      event.target.parentNode.classList.contains('modal_container') ||
      event.target.classList.contains('modal_container') ||
      event.target.parentNode.classList.contains('modal-content') ||
      event.target.parentNode.classList.contains('modal-header') ||
      event.target.parentNode.classList.contains('modal-body') ||
      event.target.parentNode.classList.contains(
        'change_project_body_container'
      ) ||
      event.target.parentNode.classList.contains(
        'change_project_body_current_project'
      ) ||
      event.target.parentNode.classList.contains('modal-footer') ||
      event.target.parentNode.classList.contains('close') ||
      event.target.parentNode.classList.contains('delete_modal_overlay') ||
      event.target.parentNode.classList.contains(
        'delete_modal_button_container'
      ) ||
      event.target.parentNode.classList.contains('btn') ||
      event.target.parentNode.classList.contains('select_container') ||
      event.target.parentNode.classList.contains('select_title_container') ||
      event.target.parentNode.classList.contains('select_title_text') ||
      event.target.parentNode.classList.contains(
        'select_list_item_container'
      ) ||
      event.target.parentNode.classList.contains('select_list_item') ||
      event.target.parentNode.classList.contains('select_title_icon') ||
      event.target.parentNode.classList.contains(
        'time_report_day_description'
      ) ||
      event.target.classList.contains('time_report_day_description')
    ) {
      return
    }
    setDraganDroped(!draganDroped)
    const currentWorkItem = containerRef.current
    let _day = null

    let shiftX = event.clientX - currentWorkItem.getBoundingClientRect().left
    let shiftY = event.clientY - currentWorkItem.getBoundingClientRect().top

    const dragingWorkItem = currentWorkItem.cloneNode(true)

    document.body.append(dragingWorkItem)

    const moveAt = (pageX, pageY) => {
      dragingWorkItem.style.left = pageX - shiftX + 'px'
      dragingWorkItem.style.top = pageY - shiftY + 'px'
    }

    dragingWorkItem.style.width = `${currentWorkItem.offsetWidth}px`
    dragingWorkItem.style.position = 'absolute'
    dragingWorkItem.style.zIndex = 1000
    dragingWorkItem.classList.add(CLASS_NAME_DRAGING_WORK_ITEM)

    moveAt(event.pageX, event.pageY)

    currentWorkItem.classList.add(CLASS_NAME_SHADOW_WORK_ITEM)

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY)

      const belowNodeDay = (node) => {
        if (!node) {
          _day = null
          removeClassNameBelowDayContainer()
          return
        }
        if (node.dataset.day) {
          _day = node.dataset.day
          return
        }
        belowNodeDay(node?.parentElement)
      }

      const coord = dragingWorkItem.getBoundingClientRect()

      belowNodeDay(document.elementFromPoint(coord.left, coord.top))

      addClassNameBelowDayContainer(_day)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove)

    dragingWorkItem.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove)
      dragingWorkItem.onmouseup = null
      dragingWorkItem.remove()
      currentWorkItem.classList.remove(CLASS_NAME_SHADOW_WORK_ITEM)
      removeClassNameBelowDayContainer()
      if (_day && new Date(date).getDate() !== Number(_day)) {
        const newDate = new Date(new Date(date).setDate(_day))
        editTimeReport({
          ...editableText,
          date: `${newDate.getFullYear()}-${
            newDate.getMonth() + 1
          }-${newDate.getDate()}`,
        })
      }
    }
    dragingWorkItem.touchend = function () {
      document.removeEventListener('touchmove', onMouseMove)

      dragingWorkItem.touchend = null
      dragingWorkItem.remove()
      currentWorkItem.classList.remove(CLASS_NAME_SHADOW_WORK_ITEM)
      removeClassNameBelowDayContainer()
      if (_day && new Date(date).getDate() !== Number(_day)) {
        const newDate = new Date(new Date(date).setDate(_day))
        editTimeReport({
          ...editableText,
          date: `${newDate.getFullYear()}-${
            newDate.getMonth() + 1
          }-${newDate.getDate()}`,
        })
      }
    }
  }
  //todo: check memo
  return (
    <div
      className={
        `time_report_day_row full ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting} drag_button` +
        (index !== 0 ? ' top_line' : '')
      }
      ref={containerRef}
      onDragStart={handleDragAndDrop}
      draggable={isDraggable}
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
        <ReportItemForm
          textInputValue={textInputValue}
          handleTextInputChange={handleChangeTextInputValue}
          handleTextInputFocus={handleInputFocus}
          handleTextInputBlur={handleInputBlur}
          textInputError={isTextInputError}
          textInputAutofocus
          timeInputValue={timeInputValue}
          handleTimeInputChange={handleChangeTimeInputValue}
          handleTimeInputFocus={handleInputFocus}
          handleTimeInputBlur={handleInputBlur}
          timeInputError={isTimeInputError}
          timeInputPlaceholder="0:00"
          timeInputMaskPlaceholder="0"
          timeInputMask="9:99"
          handleFormSubmit={handlerSubmit}
        />
      ) : (
        <ReportItemForm
          textInputValue={text}
          timeInputValue={parseMinToHoursAndMin(hours)}
          isEditing={false}
          onButtonClick={handlerOpenMenu}
          timeInputPlaceholder="0:00"
          timeInputMaskPlaceholder="0"
          timeInputMask="9:99"
        />
      )}

      <div className="time_report_day_edit">
        {editMenu && !idEditingWorkItem && (
          <ReportItemMenu
            idEditingWorkItem={idEditingWorkItem}
            id={id}
            handlerCancelEditMode={handlerClickEditMode}
            isOneProject={isOneProject}
            handlerClickOpenDeleteModal={handlerClickOpenDeleteModal}
            handlerClickEditMode={handlerClickEditMode}
            hanldeClickToggleShowModalChangeProject={
              hanldeClickToggleShowModalChangeProject
            }
          />
        )}
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
  showAlert,
}

export default connect(mapStateToProps, actions)(memo(ReportItem))
