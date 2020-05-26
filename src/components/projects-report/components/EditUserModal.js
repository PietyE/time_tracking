import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import {
  getEditingUserIdSelector,
  getEditingUser,
  getSelectedMonthSelector,
} from 'reducers/projects-report'
import {
  setNewSalary,
  setNewRate,
  setNewCost,
  setNewComment,
  setEditedComment,
} from 'actions/users'
import ModalRow from './ModalRow'
import ModalTitle from './ModalTitle'
import ModalInput from './ModalInput'

const EditUserModal = (props) => {
  const {
    handlerCloseModalEdit,
    editingUser = {},
    selectedDate = {},
    setNewSalary,
    setNewRate,
    setNewCost,
    setNewComment,
    setEditedComment,
  } = props

  const _comment = editingUser.comments[0] ? editingUser.comments[0].text : ''

  const commentId = editingUser.comments[0] ? editingUser.comments[0].id : null

  const [newSalary, setNewSalaryLocal] = useState(+editingUser.current_salary)
  const [newRate, setNewRateLocal] = useState(+editingUser.current_rate)
  const [newCoast, setNewCoastLocal] = useState(+editingUser.total_expenses)
  const [comment, setCommentLocal] = useState(_comment)

  const handlerCloseEditModal = (e) => {
    e.stopPropagation()
    handlerCloseModalEdit()
  }

  const handlerChangeSalary = (e) => {
    setNewSalaryLocal(e.target.value)
  }

  const handlerOnClickSaveNewSalary = () => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      salary: newSalary,
    }
    setNewSalary(data)
  }

  const handleCancelEditSalary = () => {
    setNewSalaryLocal(+editingUser.current_salary)
  }

  const handlerChangeRate = (e) => {
    setNewRateLocal(e.target.value)
  }

  const handlerOnClickSaveNewRate = () => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: newRate,
    }
    setNewRate(data)
  }

  const handleCancelEditRate = () => {
    setNewRateLocal(+editingUser.current_rate)
  }

  const handlerChangeCoast = (e) => {
    setNewCoastLocal(e.target.value)
  }

  const handleSaveCost = () => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      amount: newCoast,
    }
    setNewCost(data)
  }

  const handleCancelEditCost = () => {
    setNewCoastLocal(+editingUser.total_expenses)
  }

  const handleChangeInputCommnent = (e) => {
    setCommentLocal(e.target.value)
  }

  const handleSaveNewComment = () => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      text: comment,
    }
    setNewComment(data)
  }

  const handleSaveEditedComment = () => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      text: comment,
      commentId: commentId,
    }
    setEditedComment(data)
  }

  const handleCancelEditComment = () => {
    setCommentLocal(_comment)
  }

  return (
    <div className={'edit-user-modal-overlap'}>
      <div className="edit-user-modal-container">
        <span
          className="edit-user-modal-close-button-container"
          onClick={handlerCloseEditModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <ModalRow>
          <ModalTitle title={`Employee:  `} />
          <span>{` ${editingUser.name} (${editingUser.email})`}</span>
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Selected Date: `} />
          <span>
            {new Date(
              selectedDate.year,
              selectedDate.month
            ).toLocaleDateString()}
          </span>
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Salary ($): `} />
          <ModalInput
            value={newSalary}
            prevValue={editingUser.current_salary}
            handleChangeInput={handlerChangeSalary}
            handleSaveChange={handlerOnClickSaveNewSalary}
            handleCancelChanged={handleCancelEditSalary}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Rate ($): `} />
          <ModalInput
            value={newRate}
            prevValue={editingUser.current_rate}
            handleChangeInput={handlerChangeRate}
            handleSaveChange={handlerOnClickSaveNewRate}
            handleCancelChanged={handleCancelEditRate}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Cost (грн): `} />
          <ModalInput
            value={newCoast}
            prevValue={editingUser.total_expenses}
            handleChangeInput={handlerChangeCoast}
            handleSaveChange={handleSaveCost}
            handleCancelChanged={handleCancelEditCost}
          />
        </ModalRow>
        <ModalRow>
          <span className="input_container">
            <Form className="text_area_comment">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <div className="comment_title_container">
                  <span className="comment_title_text">Comment: </span>
                  {comment !== _comment && (
                    <div>
                      <span
                        className="comment_button save"
                        onClick={
                          commentId
                            ? handleSaveEditedComment
                            : handleSaveNewComment
                        }
                      >
                        Save
                      </span>
                      <span
                        className="comment_button cancel"
                        onClick={handleCancelEditComment}
                      >
                        Cancel
                      </span>
                    </div>
                  )}
                </div>
                <Form.Control
                  as="textarea"
                  rows="3"
                  onChange={handleChangeInputCommnent}
                  value={comment}
                />
              </Form.Group>
            </Form>
          </span>
        </ModalRow>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  editingUserId: getEditingUserIdSelector(state),
  editingUser: getEditingUser(state),
  selectedDate: getSelectedMonthSelector(state),
})

const actions = {
  setNewSalary,
  setNewRate,
  setNewCost,
  setNewComment,
  setEditedComment,
}

export default connect(mapStateToProps, actions)(EditUserModal)
