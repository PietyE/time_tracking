import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux';

import clock from 'images/sideMenuIcons/clock.svg'
import check from 'images/inHouseEmployees/checkbox-check.svg'
import { setProcessedStatus } from 'actions/users'

import { selectProjectsByUserId,
         selectCommentsByUserId 
        } from 'selectors/project-report-details';
import { getUsersProjectReport } from 'actions/projects-report';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { EmployeesMainComponentContext } from 'context/employeesMainComponent-context'


function User (props) {
  const {
    name,
    email,
    userId,
    salary,
    overtime,
    hours,
    toPay,
    currency,
    userData,
    selectedDate,
    is_processed,
    // eslint-disable-next-line no-unused-vars
    commentsOn
  } = props;

  const [checked, setChecked] = useState(is_processed);
  const [currentUserCommentShow, setCurrentUserCommentShow] = useState(false);
  const contextType = useContext(EmployeesMainComponentContext);
  const dispatch = useDispatch();
  const comments = useShallowEqualSelector(state => selectCommentsByUserId(state, userId))

  const loadProjects = useCallback(() => {
    dispatch(getUsersProjectReport(userId))
  }, [dispatch, userId])

  useEffect(() => {
    setChecked(is_processed)
  }, [is_processed])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const userProjects = useShallowEqualSelector((state) => selectProjectsByUserId(state, userId))
  
  const toPayCheck = (e) => {
    e.stopPropagation()
    setChecked(!checked)
    dispatch(setProcessedStatus({
      id: userId,
      month: selectedDate.month + 1,
      year: selectedDate.year,
    })
    )
  }

  const chooseUser = (e) => {
    e.stopPropagation()
    contextType.chooseUser(userData, checked)
    contextType.showWindowWithUserInfo()
  }

  const showComments = () => {
    if(contextType.currentUserId === userId) {
      setCurrentUserCommentShow(true)
      contextType.showComments()
    } else {
      setCurrentUserCommentShow(false)
    }
  }

  const hideUserComments = () => {
    if(contextType.currentUserId === userId) {
      setCurrentUserCommentShow(false)
      contextType.hideComments()
    }
  }

  useEffect(() => {
    if(currentUserCommentShow !== contextType.commentsOn){
      setCurrentUserCommentShow(false)
    }
    if(contextType.currentUserId !== userId){
      setCurrentUserCommentShow(false)
    }
    if(contextType.commentsOn && contextType.currentUserId === userId){
      setCurrentUserCommentShow(true)
    }
  }, [currentUserCommentShow, contextType.commentsOn, contextType.currentUserId, userId])

  return (
    <div className={`user_info ${contextType.currentUserId === userId ? 'selected' : ''}`} onClick={chooseUser}>
      <img src={clock} alt="avatar" className="user_avatar" />
      <div className="name_email">
        <span className="name">{name}</span>
        <span className="email">{email}</span>
      </div>
      <div className="projects">
        <span className={`${userProjects.length ? '' : 'empty'}`}>{userProjects.length} Active</span>
      </div>
      <span className="salary">{currency}{salary}</span>
      <div className="overtime_block">
        <span className="overtime">{currency}{overtime}</span>
        <span className="hours">{hours}</span>
      </div>
      <div className="toPay">
        <span className="pay">{toPay}</span>
        <span className="grn">грн</span>
      </div>
      <div className="comments_checkbox">
        <div onClick={showComments}>
          { !currentUserCommentShow &&
          <>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="chat_img">
            <path d="M13.9062 9.49219C14.4456 9.49219 14.8828 9.05497 14.8828 8.51562C14.8828 7.97628 14.4456 7.53906 13.9062 7.53906C13.3669 7.53906 12.9297 7.97628 12.9297 8.51562C12.9297 9.05497 13.3669 9.49219 13.9062 9.49219Z" fill="#222222B2"/>
            <path d="M10 9.49219C10.5393 9.49219 10.9766 9.05497 10.9766 8.51562C10.9766 7.97628 10.5393 7.53906 10 7.53906C9.46066 7.53906 9.02344 7.97628 9.02344 8.51562C9.02344 9.05497 9.46066 9.49219 10 9.49219Z" fill="#222222B2"/>
            <path d="M6.09375 9.49219C6.63309 9.49219 7.07031 9.05497 7.07031 8.51562C7.07031 7.97628 6.63309 7.53906 6.09375 7.53906C5.55441 7.53906 5.11719 7.97628 5.11719 8.51562C5.11719 9.05497 5.55441 9.49219 6.09375 9.49219Z" fill="#222222B2"/>
            <path d="M19.2188 0H0.78125C0.349766 0 0 0.349766 0 0.78125V16.25C0 16.6815 0.349766 17.0312 0.78125 17.0312H7.69441L9.33945 19.6359C9.48262 19.8626 9.73195 20 10 20C10.268 20 10.5174 19.8626 10.6605 19.6359L12.3056 17.0312H19.2188C19.6502 17.0312 20 16.6815 20 16.25V0.78125C20 0.349766 19.6502 0 19.2188 0ZM18.4375 15.4688H11.875C11.607 15.4688 11.3576 15.6062 11.2145 15.8328L10 17.7557L8.78555 15.8328C8.64238 15.6062 8.39305 15.4688 8.125 15.4688H1.5625V1.5625H18.4375V15.4688Z" fill="#222222B2"/>
          </svg>
          <div className={`comments_counter ${comments.length ? '' : 'empty_comments'} closed`}>{comments.length}</div>
          </>
          }
        </div>
        <div onClick={hideUserComments}>  
          { currentUserCommentShow &&
          <>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="chat_img">
            <path d="M13.9062 9.49219C14.4456 9.49219 14.8828 9.05497 14.8828 8.51562C14.8828 7.97628 14.4456 7.53906 13.9062 7.53906C13.3669 7.53906 12.9297 7.97628 12.9297 8.51562C12.9297 9.05497 13.3669 9.49219 13.9062 9.49219Z" fill="#009C98"/>
            <path d="M10 9.49219C10.5393 9.49219 10.9766 9.05497 10.9766 8.51562C10.9766 7.97628 10.5393 7.53906 10 7.53906C9.46066 7.53906 9.02344 7.97628 9.02344 8.51562C9.02344 9.05497 9.46066 9.49219 10 9.49219Z" fill="#009C98"/>
            <path d="M6.09375 9.49219C6.63309 9.49219 7.07031 9.05497 7.07031 8.51562C7.07031 7.97628 6.63309 7.53906 6.09375 7.53906C5.55441 7.53906 5.11719 7.97628 5.11719 8.51562C5.11719 9.05497 5.55441 9.49219 6.09375 9.49219Z" fill="#009C98"/>
            <path d="M19.2188 0H0.78125C0.349766 0 0 0.349766 0 0.78125V16.25C0 16.6815 0.349766 17.0312 0.78125 17.0312H7.69441L9.33945 19.6359C9.48262 19.8626 9.73195 20 10 20C10.268 20 10.5174 19.8626 10.6605 19.6359L12.3056 17.0312H19.2188C19.6502 17.0312 20 16.6815 20 16.25V0.78125C20 0.349766 19.6502 0 19.2188 0ZM18.4375 15.4688H11.875C11.607 15.4688 11.3576 15.6062 11.2145 15.8328L10 17.7557L8.78555 15.8328C8.64238 15.6062 8.39305 15.4688 8.125 15.4688H1.5625V1.5625H18.4375V15.4688Z" fill="#009C98"/>
          </svg>
          <div className={`comments_counter ${comments.length ? '' : 'empty_comments'} open`}>{comments.length}</div>
          </>
          }
          
        </div>
        {!checked &&
          <div className="checkbox" onClick={toPayCheck} />
        }     
        {checked &&
        <div className="checkbox_checked" onClick={toPayCheck}>
          <div className="checkbox_img">
          <img src={check} alt="check"/>
          </div>
        </div>
        }
      </div>

    </div>
  )
}
export default User;