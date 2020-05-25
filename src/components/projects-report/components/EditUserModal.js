import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import {
  getEditingUserIdSelector,
  getEditingUser,
  getSelectedMonthSelector,
} from 'reducers/projects-report'
import { setNewSalary, setNewRate } from 'actions/users'
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
  } = props

  const [newSalary, setNewSalaryLocal] = useState(+editingUser.current_salary)
  const [newRate, setNewRateLocal] = useState(+editingUser.current_rate)
  const [newCoast, setNewCoast] = useState('')
  const [comment, setComment] = useState(editingUser.comment)

  const handlerClose = (e) => {
    e.stopPropagation()
    handlerCloseModalEdit()
  }

  const handlerChangeSalary = (e) => {
    setNewSalaryLocal(e.target.value)
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
    setNewCoast(e.target.value)
  }

  const handlerOnClickSaveNewSalary = (e) => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      salary: newSalary,
    }
    setNewSalary(data)
  }

  return (
    <div className={'edit-user-modal-overlap'}>
      <div className="edit-user-modal-container">
        <span
          className="edit-user-modal-close-button-container"
          onClick={handlerClose}
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
          {/* <span className="input_container">
            <input
              className="edit_user_modal_input"
              type="text"
              value={this.state.newRate}
              onChange={this.handlerChangeRate}
            />
            {+this.state.newRate !== +editingUser.current_rate && (
              <span className="save_button">
                <FontAwesomeIcon icon={faSave} />
              </span>
            )}
          </span> */}
        </ModalRow>
        <ModalRow>
          <ModalTitle title={`Coast (грн): `} />
          {/* <span className="input_container">
            <input
              className="edit_user_modal_input"
              type="text"
              value={this.state.newCoast}
              onChange={this.handlerChangeRate}
            />
            {+this.state.newCoast !== +editingUser.coast && (
              <span className="save_button">
                <FontAwesomeIcon icon={faSave} />
              </span>
            )}
          </span> */}
        </ModalRow>
        <ModalRow>
          <span className="input_container">
            <Form className="text_area_comment">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="comment-title">Comment:</Form.Label>
                <Form.Control as="textarea" rows="3" />
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
}

export default connect(mapStateToProps, actions)(EditUserModal)
