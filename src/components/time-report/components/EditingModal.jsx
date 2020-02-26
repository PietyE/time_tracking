import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import InputMask from 'react-input-mask'

import { parseMinToHoursAndMin } from 'utils/common'
import Modal from 'components/ui/modal'
import { getTimeReportForEdit } from 'selectors/timereports'

function EditingModal({
  handlerClickOpenEditModal,
  edittingReport,
  editTimeReport,
  reportItemContainerRef,
}) {
  const [modalCoords, setModalCoords] = useState(
    reportItemContainerRef.current.getBoundingClientRect()
  )
  const { title, duration, developer_project, date, id } = edittingReport

  const getCoordsRefElement = useCallback(() => {
    setModalCoords(reportItemContainerRef.current.getBoundingClientRect())
  }, [reportItemContainerRef])

  const handlerSubmit = e => {
    e.preventDefault()
    const [_hour, min] = e.target.duration.value.split(':')
    const duration = _hour ? +_hour * 60 + +min : +min
    const title = e.target.title.value
    editTimeReport({
      developer_project,
      title,
      duration,
      date,
      id,
    })
    handlerClickOpenEditModal(false)
  }

  useEffect(() => {
    document.addEventListener('scroll', getCoordsRefElement)
    return () => {
      document.removeEventListener('scroll', getCoordsRefElement)
    }
  }, [reportItemContainerRef, getCoordsRefElement])

  return (
    <Modal>
      <div
        className="edit_modal_overlay"
        style={{ top: modalCoords.top + 'px', left: modalCoords.left + 'px' }}
      >
        <form
          style={{ display: 'contents' }}
          onSubmit={handlerSubmit}
          id="edit_form"
        >
          <textarea
            className="edit_modal_textarea"
            defaultValue={title}
            name="title"
          />
          <InputMask
            placeholder="HH"
            maskPlaceholder="0"
            className="hours_input"
            mask="99:99"
            defaultValue={parseMinToHoursAndMin(duration)}
            name="duration"
          />
          <div className="edit_modal_button_container">
            <Button type="submit">
              <span>Save</span>
            </Button>
            <Button onClick={handlerClickOpenEditModal}>
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

const mapStateToProps = (state, ownProps) => ({
  edittingReport: getTimeReportForEdit(state, ownProps.id),
})

const actions = {}

export default connect(mapStateToProps, actions)(EditingModal)
