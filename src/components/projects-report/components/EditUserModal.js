import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

import {
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
import CurrencySelect from './CurrencySelect'
import {selectCurrencyList} from '../../../selectors/currency';

const EditUserModal = (props) => {
  const {
    handlerCloseModalEdit,
  } = props

  const editingUser = useSelector(getEditingUser, isEqual)
  const selectedDate = useSelector(getSelectedMonthSelector, isEqual)
  const _comment = editingUser.comments
  const commentId = editingUser.commentId
  const _expense = editingUser.total_expenses
  const expenseId = editingUser.expensesId
  const currenciesList = useSelector(selectCurrencyList)
  const [comment, setCommentLocal] = useState(_comment)
  const [isFetching, setIsFetching] = useState(false)
  const [selectedSalaryCurrency, setSalaryCurrency] = useState('Currency')
  const [selectedRateCurrency, setRateCurrency] = useState('Currency')
  const [salary, setSalary] = useState('')
  const [rate, setRate] = useState('')

  const dispatch = useDispatch()

  const initialCurrencyState = {
    salary: '',
    rate:''
  }
  const [isCEdit, setIsCEdit] = useState(initialCurrencyState)

  const fetchingStatus = useSelector(getIsFetchingProjectsReport, isEqual)

  const setCurrentCurrency =()=>{
    currenciesList.forEach((e)=>{
      if(e.sign == editingUser.salaryCurrency ){
        if(salary){
          setSalaryCurrency(salary)
        } else {
        setSalaryCurrency(e.serverId)
        }
      }
      if( e.sign == editingUser.rateCurrency){
        if(rate){
          setRateCurrency(rate)
        } else {
        setRateCurrency(e.serverId)
        }
      }   
    });
  }

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
      currency: selectedSalaryCurrency
    }
    dispatch(setNewSalary(data))
    setIsCEdit({ ...isCEdit, salary: ''})
  }

  const handlerOnClickSaveNewRate = (newRate) => {
    const data = {
      user: editingUser.id,
      date_start: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: newRate,
      currency: selectedRateCurrency
    }
    dispatch(setNewRate(data))
    setIsCEdit({ ...isCEdit, rate: ''})
  }

  const handleSaveCost = (newCoast) => {
    const data = {
      user: editingUser.id,
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      amount: newCoast,
    }
    dispatch(setNewCost(data))
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
    dispatch(setEditedCost(data))
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
    dispatch(setNewComment(data))
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
    dispatch(setEditedComment(data))
    setIsFetching(true)
  }

  const handleCancelEditComment = () => {
    setCommentLocal(_comment)
  }

  const handleChangeCurrency = (data, row=null) => {
    if(row =='salary'){
      setSalaryCurrency(data)
      setSalary(data)
    }else{
      setRateCurrency(data)
      setRate(data)
    }
    let receive = {};
     receive[row]= row;
     let res = {...isCEdit, ...receive}
     setIsCEdit(res);
  }

  const handlerClickCancelButton = (row) => {
    if(setIsCEdit){
      setIsCEdit({...isCEdit, [row]: ''})
    }
    if(row === 'salary') {
      currenciesList.forEach((e)=>{
        if(e.sign == editingUser.salaryCurrency ){
          setSalaryCurrency(e.serverId)
        }   
      });
    } else {
      currenciesList.forEach((e)=>{
        if( e.sign == editingUser.rateCurrency){
          setRateCurrency(e.serverId)
        }
      })
    }
  }

  useEffect(() => {
    if (isFetching) {
      setIsFetching(fetchingStatus)
    }
  }, [fetchingStatus])

  useEffect(() => {
    setCurrentCurrency();
  }, [currenciesList, editingUser])

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
          <ModalTitle title={'Employee:  '} />
          <div className="edit_user_modal_title_value_container">
            <span className="edit_user_modal_title_value_text bold">{`${editingUser.name} (${editingUser.email})`}</span>
          </div>
        </ModalRow>
        <ModalRow>
          <ModalTitle title={'Selected Date: '} />
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
          <ModalTitle title={'Salary'} />
          <CurrencySelect
            parentHandler={handleChangeCurrency}
            selectedCurrency={selectedSalaryCurrency}
            row={'salary'}
          />
          <ModalInput
            // prevValue={editingUser.current_salary}
            prevValue={editingUser.salary_uah}
            CisEdit={isCEdit}
            setIsCEdit={setIsCEdit}
            row={'salary'}
            handleSaveChange={handlerOnClickSaveNewSalary}
            handleCancelChange={handlerClickCancelButton}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={'Rate'} />
          <CurrencySelect
            parentHandler={handleChangeCurrency}
            selectedCurrency={selectedRateCurrency}
            row={'rate'}
          />
          <ModalInput
            // prevValue={editingUser.current_rate}
            prevValue={editingUser.rate_uah}
            handleSaveChange={handlerOnClickSaveNewRate}
            handleCancelChange={handlerClickCancelButton}
            CisEdit={isCEdit}
            setIsCEdit={setIsCEdit}
            row={'rate'}
          />
        </ModalRow>
        <ModalRow>
          <ModalTitle title={'Cost'} />
          <ModalInput
            prevValue={_expense}
            handleSaveChange={expenseId ? handleEditCost : handleSaveCost}
          />
        </ModalRow>
        <ModalRow direction={'column'}>
          <div className="comment_title_container">
            <ModalTitle title={'Comment:'} />
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

export default EditUserModal
