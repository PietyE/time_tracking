import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import {
  getEditingUserIdSelector,
  getEditingUser,
  getSelectedMonthSelector,
} from 'reducers/projects-report'
import { setNewSalary } from 'actions/users'
import Modal from 'components/ui/modal'

class EditUserModal extends Component {
  state = {
    newSalary: +this.props.editingUser.current_salary,
    newRate: +this.props.editingUser.current_rate,
    newCoast: 0,
  }

  handlerClose = (e) => {
    e.stopPropagation()
    this.props.handlerCloseModalEdit()
  }

  handlerChangeSalary = (e) => {
    //e.preventDefault()
    this.setState({ newSalary: e.target.value })
  }

  handlerChangeRate = (e) => {
    this.setState({ newRate: e.target.value })
  }

  handlerChangeCoast = (e) => {
    this.setState({ newCoast: e.target.value })
  }

  handlerOnClickSaveNewSalary = (e) => {
    const data = {
      user: this.props.editingUser.id,
      date_start: new Date(
        this.props.selectedDate.year,
        this.props.selectedDate.month + 1
      )
        .toISOString()
        .slice(0, 10),
      salary: this.state.newSalary,
    }
    this.props.setNewSalary(data)
  }

  render() {
    const { editingUser, selectedDate } = this.props

    const usdFormat = new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
    })

    return (
      <div className={'edit-user-modal-overlap'}>
        <div className="edit-user-modal-container">
          <span
            className="edit-user-modal-close-button-container"
            onClick={this.handlerClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <div className="edit-user-modal-title-container">
            <h5>Employee: </h5>
            <span>{` ${editingUser.name} (${editingUser.email})`}</span>
          </div>
          <div className="edit-user-modal-title-container">
            <h5>Select Date: </h5>
            <span>
              {new Date(
                selectedDate.year,
                selectedDate.month
              ).toLocaleDateString()}
            </span>
          </div>
          <div className="edit-user-modal-title-container">
            <h5>Salary ($): </h5>
            <span className="input_container">
              <input
                className="edit_user_modal_input"
                type="text"
                value={this.state.newSalary}
                onChange={this.handlerChangeSalary}
              />
              {+this.state.newSalary !== +editingUser.current_salary && (
                <span
                  className="save_button"
                  onClick={this.handlerOnClickSaveNewSalary}
                >
                  <FontAwesomeIcon icon={faSave} />
                </span>
              )}
            </span>
          </div>
          <div className="edit-user-modal-title-container">
            <h5>Rate ($): </h5>
            <span className="input_container">
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
            </span>
          </div>
          <div className="edit-user-modal-title-container">
            <h5>Coast (грн): </h5>
            <span className="input_container">
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
            </span>
          </div>
          <div className="edit-user-modal-title-container">
            <span className="input_container">
              <Form className="text_area_comment">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="comment-title">Comment:</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Form>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  editingUserId: getEditingUserIdSelector(state),
  editingUser: getEditingUser(state),
  selectedDate: getSelectedMonthSelector(state),
})

const actions = {
  setNewSalary,
}

export default connect(mapStateToProps, actions)(EditUserModal)
