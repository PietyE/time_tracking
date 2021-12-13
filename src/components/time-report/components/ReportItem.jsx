import React, { memo, useState, useCallback, useRef } from 'react'
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
import CopyToClipboardButton from 'components/ui/copyToClipboardButton/CopyToClipboardButton'

 import {WARNING_ALERT, SUCCES_ALERT} from '../../../constants/alert-constant'
 import {showAler} from '../../../actions/alert'

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
     if(duration === 0){
       showAler({
         type: WARNING_ALERT,
         message: 'Worked time can\'t be 0',
         delay: 5000,
       })
       return
     }

    if(duration > 8){
      showAler({
        type: WARNING_ALERT,
        message: 'Worked time can\'t be more 8 hours',
        delay: 5000,
      })
      return
    }
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

  const handleDragAndDrop = (event) => {
    const currentWorkItem = containerRef.current
    let _day = null

    const dragingWorkItem = currentWorkItem.cloneNode(true)

    document.body.append(dragingWorkItem)

    const moveAt = (pageX, pageY) => {
      dragingWorkItem.style.left = pageX - 5 + 'px'
      dragingWorkItem.style.top = pageY - 5 + 'px'
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

  const onCopy = () => {
    showAler({
      type: SUCCES_ALERT,
      message: 'Copy to clipboard',
      delay: 5000,
    })
  }

  return (
    <div
      className={`time_report_day_row full ${activeClassNameContainerForDeletting} ${activeClassNameContainerForEditting}`}
      ref={containerRef}
      onDragStart={() => false}
    >
      <span className="drag_button" onMouseDown={handleDragAndDrop}></span>
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
          <CopyToClipboardButton text={text} onCopy={onCopy}/>
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
  showAler,
}

export default connect(mapStateToProps, actions)(memo(ReportItem))
