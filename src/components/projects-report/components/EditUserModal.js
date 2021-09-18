import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

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

import Modal from 'components/ui/modal'
import { Spinner } from 'react-bootstrap'
import { getIsFetchingProjectsReport } from '../../../selectors/developer-projects'
import { isEqual } from 'lodash'

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
  console.dir(editingUser);
  const _comment = editingUser.comments[0] ? editingUser.comments[0].text : ''
  console.dir(_comment);

  const commentId = editingUser.comments[0] ? editingUser.comments[0].id : null
  console.dir(commentId);
  // const _expense = editingUser.expenses[0] ? editingUser.expenses[0].amount : ''

  // const expenseId = editingUser.expenses[0] ? editingUser.expenses[0].id : null

  const [comment, setCommentLocal] = useState(_comment)
  const [isFetching, setIsFetching] = useState(false)

  const fetchingStatus = useSelector(getIsFetchingProjectsReport, isEqual)

  useEffect(() => {
    if (isFetching) {
      setIsFetching(fetchingStatus)
    }
  }, [fetchingStatus])

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
      // expenseId: expenseId,
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
    console.dir(data);
    setNewComment(data)
    setIsFetching(true)

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
    setIsFetching(true)
  }

  const handleCancelEditComment = () => {
    setCommentLocal(_comment)
  }

  return (
    <Modal>
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
            <span className="edit_user_modal_title_value_text bold">{`${editingUser.name} (${editingUser.email})`}</span>
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
            // prevValue={editingUser.current_salary}
            prevValue={editingUser.salary_uah}

            handleSaveChange={handlerOnClickSaveNewSalary}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Rate ($): `} />
          <ModalInput
            // prevValue={editingUser.current_rate}
            prevValue={editingUser.rate_uah}
            handleSaveChange={handlerOnClickSaveNewRate}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Cost (UAH): `} />
          <ModalInput
            // prevValue={_expense}
            // handleSaveChange={expenseId ? handleEditCost : handleSaveCost}
          />
        </ModalRow>
        <ModalRow direction={'column'}>
          <div className="comment_title_container">
            <ModalTitle title={`Comment:`} />
            {isFetching &&
            <div className = 'spinner-small'>
              <Spinner animation = "border" variant = "success"/>
            </div>
            }
            {comment !== _comment && !isFetching &&(
              <div className="edit_user_modal_button_container">
                <button
                  variant={'success'}
                  onClick={
                    commentId ? handleSaveEditedComment : handleSaveNewComment
                  }
                  className="edit_user_button save"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  variant="secondary"
                  onClick={handleCancelEditComment}
                  className="edit_user_button cancel"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
          </div>
          <textarea
            rows="3"
            onChange={handleChangeInputCommnent}
            value={comment}
            className="edit_user_comment_textarea"
          />
        </ModalRow>
      </div>
    </Modal>
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
