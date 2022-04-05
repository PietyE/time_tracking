import React, { memo, useState, useCallback, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
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

import useMenuPresent from 'custom-hook/useMenuPresent'

import { DANGER_ALERT, WARNING_ALERT } from '../../../constants/alert-constant'
import { showAler } from '../../../actions/alert'

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
  showAler,
  index,
  opneNewItem,
  dayTitle,
  selectDayStatus, selectedDayStatus, isCreate, setUserStatus, setDraganDroped, draganDroped
}) {
  const {
    title: oldTitle,
    duration: oldDuration,
    developer_project,
    date,
  } = editableText

  const containerRef = useRef(null)
  const containerHours = useRef()

  const [isDeleteRequest, setIsDeleteRequest] = useState(false)
  const [showModalChangeProject, setShowModalChangeProject] = useState(false)
  const [borderInputClassName, setBorderInputClassName] = useState('')
  const [borderInputHoursClassName, setBorderInputHoursClassName] = useState('')

  const [editMenu, handlerOpenMenu] = useMenuPresent();

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
    setEditMode(id);
  }

  const handlerCancelEditMode = () => {
    setEditMode(null)
  }

  const handlerChangeTask = (e) => {
    if (e.target.value) {
      setBorderInputClassName('')
    }
  }

  const handlerChangeHours = (e) => {
    const value = e.target.value
    if (value) {
      setBorderInputHoursClassName('')
    }
  }

  const handlerSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const [_hour, min] = e.target.duration.value.split(':')
    const duration = _hour ? +_hour * 60 + +min : +min
    const title = e.target.title.value

    if (title.length===0 && duration === 0) {
      setBorderInputClassName('border-danger')
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        title: 'Fields can not be empty',
        message:  'Fields can not be empty',
        delay: 5000,
      })
      return
    }

    if (title.length===0) {
      setBorderInputClassName('border-danger')
      showAler({
        type: DANGER_ALERT,
        message:  'Fields Task can not be empty',
        delay: 5000,
      })
      return
    }

    if (duration === 0) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: WARNING_ALERT,
        message: 'Worked time can\'t be 0',
        delay: 5000,
      })
      return
    }

    if (duration > 480) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: WARNING_ALERT,
        message: 'Worked time can\'t be more 8 hours',
        delay: 5000,
      })
      return
    }
    if ((duration % 15) !== 0) {
      setBorderInputHoursClassName('border-danger')
      showAler({
        type: WARNING_ALERT,
        message: 'The value must be a multiple of 15',
        delay: 5000,
      })
      return
    }

    if (oldDuration !== duration || oldTitle !== title) {
      setBorderInputHoursClassName('border-danger')
      editTimeReport({
        developer_project,
        title,
        duration,
        date,
        id,
      })
    }
    setEditMode(null)
    setBorderInputHoursClassName('')
    setBorderInputHoursClassName('')
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter'&& !e.shiftKey) {
      if (e.target.id === 'reportTask') {
        e.preventDefault()
        if (!e.target.value) {
          setBorderInputClassName('border-danger')
          showAler({
            type: DANGER_ALERT,
            message:  'Field Task can not be empty',
            delay: 5000,
          })
          return
        } else {
          setBorderInputClassName('');
          containerHours.current.focus()
         };
      }
    }
  }

  const hanldeClickToggleShowModalChangeProject = useCallback(() => {
    setShowModalChangeProject((prev) => !prev)
  }, [setShowModalChangeProject])

  const activeClassNameContainerForDeletting =
    isDeleteRequest || showModalChangeProject ? 'active' : ''
  const activeClassNameContainerForEditting =
    idEditingWorkItem === id ? 'editing' : ''

  const handleDragAndDrop = (event) => {
    if (event.target.classList.contains('time_report_day_edit')
      || event.target.parentNode.classList.contains('time_report_day_edit')
      || event.target.parentNode.classList.contains('edit_dots')
      || event.target.parentNode.classList.contains('svg-inline--fa')
      || event.target.parentElement.classList.contains('time_report_day_menu')
      || event.target.parentElement.classList.contains('edit-form')
      || event.target.parentNode.classList.contains('modal_container')
      || event.target.classList.contains('modal_container')
      || event.target.parentNode.classList.contains('modal-content')
      || event.target.parentNode.classList.contains('modal-header')
      || event.target.parentNode.classList.contains('modal-body')
      || event.target.parentNode.classList.contains('change_project_body_container')
      || event.target.parentNode.classList.contains('change_project_body_current_project')
      || event.target.parentNode.classList.contains('modal-footer')
      || event.target.parentNode.classList.contains('close')
      || event.target.parentNode.classList.contains('delete_modal_overlay')
      || event.target.parentNode.classList.contains('delete_modal_button_container')
      || event.target.parentNode.classList.contains('btn')
      || event.target.parentNode.classList.contains('select_container')
      || event.target.parentNode.classList.contains('select_title_container')
      || event.target.parentNode.classList.contains('select_title_text')
      || event.target.parentNode.classList.contains('select_list_item_container')
      || event.target.parentNode.classList.contains('select_list_item')
      || event.target.parentNode.classList.contains('select_title_icon')
      || event.target.parentNode.classList.contains('time_report_day_description')
      || event.target.classList.contains('time_report_day_description')
    ) {
      return
    }
    setDraganDroped(!draganDroped);
    const currentWorkItem = containerRef.current
    let _day = null

    let shiftX = event.clientX - currentWorkItem.getBoundingClientRect().left;
    let shiftY = event.clientY - currentWorkItem.getBoundingClientRect().top;

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

  return (
    <div
      className={`time_report_day_row full ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting} drag_button` + (index !== 0 ? ' top_line' : '')}
      ref={containerRef}
      onDragStart={() => false}
      onMouseDown={handleDragAndDrop}
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
            style={{ display: 'flex' }}
            onSubmit={handlerSubmit}
            id="edit_form"
            className={'edit-form'}
          >
            <TextareaAutosize
              className={`time_report_day_description textarea ${borderInputClassName}`}
              defaultValue={text}
              autoFocus
              onFocus={(e) => {
                const temp_value = e.target.value
                e.target.value = ''
                e.target.value = temp_value
              }}
              onChange={handlerChangeTask}
              onKeyPress = {handleEnterPress}
              style={{ height: '45px' }}
              name="title"
              id ='reportTask'
            />
            <InputMask
              placeholder="HH"
              maskPlaceholder="0"
              className={`hours_input time_report_day_hours ${borderInputHoursClassName}`}
              mask="9:99"
              defaultValue={parseMinToHoursAndMin(hours)}
              name="duration"
              ref={containerHours}
              onChange={handlerChangeHours}
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
        {idEditingWorkItem !== id?
          <div className={'edit_dots ' + (editMenu ? 'dots-bg' : '')} onClick={handlerOpenMenu}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              color="#414141"
              className="icon pencil_icon"
            />
          </div> :
          <button className="create_btn" onClick={
            idEditingWorkItem === id ? () => null : handlerClickEditMode}
            type={idEditingWorkItem === id ? 'submit' : 'button'}
            form="edit_form"
          >
            <FontAwesomeIcon
              icon={faCheck}
              color="#414141"
              className="icon pencil_icon"
            />
          </button>
        }

        {editMenu && !idEditingWorkItem &&
          <div className={'time_report_day_menu'}>
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
              Edit the report
            </button>
            {idEditingWorkItem !== id && isOneProject && (
              <button
                onClick={hanldeClickToggleShowModalChangeProject}
                className="button change_project_button"
                type={'button'}
                form="edit_form"
              >
                <FaExchangeAlt className="icon exchange_icon" />
                Swap to other project
              </button>
            )}
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
              Delete the report
            </button>
          </div>
        }
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
  showAler,
}

export default connect(mapStateToProps, actions)(memo(ReportItem))
