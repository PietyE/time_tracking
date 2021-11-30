import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDevelopersSelector } from 'selectors/developers';
import { selectUsersReports } from 'reducers/projects-report';
import { getConsolidateProjectReport } from 'actions/projects-report';
import { selectCommentsByUserId } from 'selectors/project-report-details';
import { selectRateList } from 'selectors/currency'

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';

import User from './User'

function UsersInfo (props) {
  const {
    selectedDate,
    commentsOn
  } = props

  const [decreaseName, setDecreaseName] = useState(false);
  const [increaseName, setIncreaseName] = useState(false);
  const [decreaseToPay, setDecreaseToPay] = useState(false);
  const [increaseToPay, setIncreaseToPay] = useState(false);
  const usersData = useShallowEqualSelector(selectUsersReports);
  const dispatch = useDispatch();

  useEffect(() => {
    getConsolidateProject()
  }, [])

  const getConsolidateProject = () => {
    dispatch(getConsolidateProjectReport())
  }

  const sortName = () => {
    if(decreaseName === false && increaseName === false) {
      setDecreaseName(true)
      setDecreaseToPay(false)
      setIncreaseToPay(false)
    } else if (decreaseName === true && increaseName === false) {
      setDecreaseName(false)
      setIncreaseName(true)
    } else {
      setDecreaseName(false)
      setIncreaseName(false)
    }
  }

  const sortToPay = () => {
    if(decreaseToPay === false && increaseToPay === false) {
      setDecreaseToPay(true)
      setDecreaseName(false)
      setIncreaseName(false)
    } else if (decreaseToPay === true && increaseToPay === false) {
      setDecreaseToPay(false)
      setIncreaseToPay(true)
    } else {
      setDecreaseToPay(false)
      setIncreaseToPay(false)
    }
  }

  const userInfo = useMemo(() => {
    if (decreaseName === true && 
        increaseName === false && 
        decreaseToPay === false && 
        increaseToPay=== false) {
      return usersData.sort((a, b) => {
        if(a.name < b.name) { return 1; }
        if(a.name > b.name) { return -1; }
        return 0;
      })
    } else if (decreaseName === false && 
               increaseName === true && 
               decreaseToPay === false && 
               increaseToPay=== false) {
      return usersData.sort((a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })
    } else if (decreaseName === false && 
               increaseName === false && 
               decreaseToPay === true && 
               increaseToPay=== false) {
      return usersData.sort((a, b) => {
        if(a.total_uah < b.total_uah) { return 1; }
        if(a.total_uah > b.total_uah) { return -1; }
        return 0;
      })
    } else if (decreaseName === false && 
              increaseName === false && 
              decreaseToPay === false && 
              increaseToPay=== true) {
      return usersData.sort((a, b) => {
        if(a.total_uah < b.total_uah) { return -1; }
        if(a.total_uah > b.total_uah) { return 1; }
        return 0;
      })
    } else if (decreaseName === false && 
               increaseName === false && 
               decreaseToPay === false && 
               increaseToPay=== false) {
        return usersData.sort((a, b) => a.email.localeCompare(b.email))
      }
    return usersData;
  }, [decreaseName, increaseName, decreaseToPay, increaseToPay, usersData])

  return (
    <div className="users_table">
      <div className="users_table_header">
        <div className="name_ordering">
          <span className="name">NAME</span>
          <div className="arrows" onClick={sortName}>
            <div className={`arrow ${decreaseName ? "hide" : "show"}`}>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.69704 1.0817C3.09686 0.543088 3.90314 0.543088 4.30296 1.0817L6.21236 3.65396C6.70217 4.3138 6.23118 5.25 5.40941 5.25H1.59059C0.76882 5.25 0.29783 4.31381 0.787638 3.65396L2.69704 1.0817Z" fill="#ADADA7"/>
              </svg>
            </div>
            <div className={`arrow ${increaseName ? "hide" : "show"}`}>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30296 4.9183C3.90314 5.45691 3.09686 5.45691 2.69704 4.9183L0.787639 2.34604C0.297831 1.6862 0.768823 0.75 1.59059 0.75L5.40941 0.75C6.23118 0.75 6.70217 1.68619 6.21236 2.34604L4.30296 4.9183Z" fill="#ADADA7"/>
              </svg>
            </div>
          </div>
        </div>
        <span className="projects">PROJECTS</span>
        <span className="salary">SALARY</span>
        <span className="overtime">OVERTIME</span>
        <div className="pay_ordering">
          <span className="name">TO PAY</span>
          <div className="arrows" onClick={sortToPay}>
            <div className={`arrow ${decreaseToPay ? "hide" : "show"}`}>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.69704 1.0817C3.09686 0.543088 3.90314 0.543088 4.30296 1.0817L6.21236 3.65396C6.70217 4.3138 6.23118 5.25 5.40941 5.25H1.59059C0.76882 5.25 0.29783 4.31381 0.787638 3.65396L2.69704 1.0817Z" fill="#ADADA7"/>
              </svg>
            </div>
            <div className={`arrow ${increaseToPay ? "hide" : "show"}`}>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.30296 4.9183C3.90314 5.45691 3.09686 5.45691 2.69704 4.9183L0.787639 2.34604C0.297831 1.6862 0.768823 0.75 1.59059 0.75L5.40941 0.75C6.23118 0.75 6.70217 1.68619 6.21236 2.34604L4.30296 4.9183Z" fill="#ADADA7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      { userInfo.map((user) => 
        (<User name={user.name} 
               key={user.id}
               email={user.email}
               userId={user.id}
               salary={user.salary_uah}
               overtime={user.total_overtimes}
               hours={user.totalHoursOvertime}
               toPay={user.total_uah.toFixed(2)}
               currency={user.salaryCurrency}
               userData={user}
               selectedDate={selectedDate}
               is_processed={user.is_processed}
               commentsOn={commentsOn} />)
      )}
    </div>
  )
}
export default UsersInfo;