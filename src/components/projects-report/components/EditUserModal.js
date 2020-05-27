import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Form, Button } from 'react-bootstrap'

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
  setEditedCost,
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
    setEditedCost,
  } = props

  const _comment = editingUser.comments[0] ? editingUser.comments[0].text : ''

  const commentId = editingUser.comments[0] ? editingUser.comments[0].id : null

  const _expense = editingUser.expenses[0] ? editingUser.expenses[0].amount : ''

  const expenseId = editingUser.expenses[0] ? editingUser.expenses[0].id : null

  const [comment, setCommentLocal] = useState(_comment)

  const handlerCloseEditModal = (e) => {
    e.stopPropagation()
    handlerCloseModalEdit()
  }

  const handlerOnClickSaveNewSalary = (newSalary) => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      salary: newSalary,
    }
    setNewSalary(data)
  }

  const handlerOnClickSaveNewRate = (newRate) => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: newRate,
    }
    setNewRate(data)
  }

  const handleSaveCost = (newCoast) => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      amount: newCoast,
    }
    setNewCost(data)
  }

  const handleEditCost = (newCoast) => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      amount: newCoast,
      expenseId: expenseId,
    }
    setEditedCost(data)
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
    <div className={'edit_user_modal_overlap'}>
      <div className="edit_user_modal_container">
        <span
          className="edit_user_modal_close_button_container"
          onClick={handlerCloseEditModal}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <ModalRow>
          <ModalTitle title={`Employee:  `} />
          <div className="edit_user_modal_title_value_container">
            <span className="edit_user_modal_title_value_text">{`${editingUser.name} (${editingUser.email})`}</span>
          </div>
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Selected Date: `} />
          <div className="edit_user_modal_title_value_container">
            <span className="edit_user_modal_title_value_text">
              {new Date(
                selectedDate.year,
                selectedDate.month
              ).toLocaleDateString()}
            </span>
          </div>
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Salary ($): `} />
          <ModalInput
            prevValue={editingUser.current_salary}
            handleSaveChange={handlerOnClickSaveNewSalary}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Rate ($): `} />
          <ModalInput
            prevValue={editingUser.current_rate}
            handleSaveChange={handlerOnClickSaveNewRate}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Cost (UAH): `} />
          <ModalInput
            prevValue={_expense}
            handleSaveChange={expenseId ? handleEditCost : handleSaveCost}
          />
        </ModalRow>
        <ModalRow>
          <span className="input_container">
            <Form className="text_area_comment">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <div className="comment_title_container">
                  <ModalTitle title={`Comment:`} />
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
  setEditedCost,
}

export default connect(mapStateToProps, actions)(EditUserModal)
