import React, { useState, useMemo, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import closeButton from 'images/projectReportIcons/closeButton.svg'
import calendar from 'images/inHouseEmployees/calendar-userData.svg'
import dot from 'images/inHouseEmployees/dot.svg'
import cash from 'images/inHouseEmployees/cash.svg'
import checkImg from 'images/inHouseEmployees/checkbox-check.svg'
import upArrow from 'images/sideMenuIcons/upArrow.svg'
import { setProcessedStatus } from 'actions/users'

import CurrencySelect from 'components/in-house-employees/components/CurrencySelect/CurrencySelect'

import { selectCommentsByUserId } from 'selectors/project-report-details';
import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector';
import { EmployeesMainComponentContext } from 'context/employeesMainComponent-context'
import ProjectData from 'components/project-report-new-design/components/ProjectData/ProjectData'
import UserComment from 'components/project-report-new-design/components/UserComment/UserComment'

import {
  setNewSalary,
  setNewRate,
  setNewCost,
  setEditedCost
} from 'actions/users'
import CreateComment from './CreateComment/CreateComment'

function WindowUserInfo (props) {
  const {
    name,
    id,
    check,
    salary,
    currency,
    hourlyRate,
    currencyRatePerHour,
    totalHours,
    overtimeSalary,
    totalSalary,
    extraCosts,
    toPaySalary,
    selectedDate,
    expensesId,
    // comments,
    commentsId,
    is_processed,
  } = props

  const [checked, setChecked] = useState(is_processed);
  const contextType = useContext(EmployeesMainComponentContext);
  const comments = useShallowEqualSelector(state => selectCommentsByUserId(state, id));
  const [editOn, setEditOn] = useState(false);
  const [newHourlyRate, setNewHourlyRate] = useState(hourlyRate);
  const [newSalary, setNewSalaryValue] = useState(salary);
  const [newExtraCosts, setNewExtraCosts] = useState(extraCosts);
  const [salaryError, setSalaryError] = useState(false);
  const [hourlyRateError, setHourlyRateError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(is_processed)
  }, [is_processed])

  const checkCurrency = (currency) => {
    if(currency === "$") {
      return "USD"
    } else if (currency === "€") {
      return "EUR"
    } else if (currency === "₴") {
      return "UAH"
    } else if (currency === "£") {
      return "GBP"
    }
  }

  const checkCurrencyId = (currency) => {
    if(currency === "$") {
      return "2e791fbc-fe79-456a-abfe-a369d979641a"
    } else if (currency === "€") {
      return "8b5039d0-793c-4486-a180-282660b5e293"
    } else if (currency === "₴") {
      return "401ca775-3af1-4415-b2d6-348ca95b6653"
    } else if (currency === "£") {
      return "f6040151-9d91-4e00-b125-86c1632db310"
    }
  }
  const oldCurrencySalary = checkCurrency(currency);
  const oldCurrencyHourlyRate = checkCurrency(currencyRatePerHour);
  const oldCurrencyExtraCosts = checkCurrency(extraCosts);
  const [newSalaryFlag, setNewSalaryFlag] = useState(oldCurrencySalary);
  const [newHourlyRateFlag, setNewHourlyRateFlag] = useState(oldCurrencyHourlyRate);
  const [newExtraCostsFlag, setNewExtraCostsFlag] = useState(oldCurrencyExtraCosts);
  const [salaryCurrencyId, setSalaryCurrencyId] = useState(checkCurrencyId(currency));
  const [hourlyRateCurrencyId, sethourlyRateCurrencyId] = useState(checkCurrencyId(currencyRatePerHour));
  const [extraCostsCurrencyId, setextraCostsCurrencyId] = useState(checkCurrencyId(extraCosts));

  const changeIcon = (value) => {
    if(value === "USD") {
      return "$"
    } else if (value === "EUR") {
      return "€"
    } else if (value === "UAH") {
      return "₴"
    } else if (value === "GBP") {
      return "£"
    }
  }

  const changeText = (value) => {
    if(value === "USD") {
      return "длр"
    } else if (value === "EUR") {
      return "евр"
    } else if (value === "UAH") {
      return "грн"
    } else if (value === "GBP") {
      return "фунт"
    }
  }

  const closeWindow = (e) => {
    e.stopPropagation()
    contextType.closeWindowWithUserInfo()
    contextType.hideComments()
  }

  const toPayCheck = (e) => {
    e.stopPropagation()
    if(id === contextType.currentUserId){
      setChecked(!checked)
      dispatch(setProcessedStatus({
        id: id,
        month: selectedDate.month + 1,
        year: selectedDate.year,
      })
      )
    }
  }

  const editPage = () => {
    setEditOn(!editOn)
    contextType.hideComments()
  }

  const changeHourlyRate = (e) => {
    if(e.target.value >= 0) {
      setNewHourlyRate(+e.target.value)
    }
  }

  const changeExtraCosts = (e) => {
    if(e.target.value >= 0) {
      setNewExtraCosts(e.target.value)
    }
  }

  const changeSalary = (e) => {
    if(e.target.value >= 0) {
      setNewSalaryValue(+e.target.value)
    }
  }

  const changeSalaryFlag = (value) => {
    setNewSalaryFlag(value.name)
    setSalaryCurrencyId(value.currencyId)
  }

  const changeHourlyRateFlag = (value) => {
    setNewHourlyRateFlag(value.name)
    sethourlyRateCurrencyId(value.currencyId)
  }

  const changeExtraCostsFlag = (value) => {
    setNewExtraCostsFlag(value.name)
    setextraCostsCurrencyId(value.currencyId)
  }

  const saveNewData = () => {
    if(newSalary !== salary || newSalaryFlag !== oldCurrencySalary) {
      if(!!newSalary) {
        const data = {
          user: id,
          date_start: new Date(selectedDate.year, selectedDate.month + 1)
            .toISOString()
            .slice(0, 10),
          salary: newSalary,
          currency: salaryCurrencyId
        }
        dispatch(setNewSalary(data))
        setSalaryError(false)
      } else {
        setSalaryError(true)
      }
    }
    if(newHourlyRate !== hourlyRate || newHourlyRateFlag !== oldCurrencyHourlyRate) {
      if(!!newHourlyRate) {
        const data = {
          user: id,
          date_start: new Date(selectedDate.year, selectedDate.month + 1)
            .toISOString()
            .slice(0, 10),
          rate: newHourlyRate,
          currency: hourlyRateCurrencyId
        }
        dispatch(setNewRate(data))
        setHourlyRateError(false)
      } else {
        setHourlyRateError(true)
      }
    }
    if(newExtraCosts !== extraCosts || newExtraCostsFlag !== oldCurrencyExtraCosts) {
      const data = {
        user: id,
        date: new Date(selectedDate.year, selectedDate.month + 1)
          .toISOString()
          .slice(0, 10),
        amount: newExtraCosts,
        expenseId: expensesId
      }
      dispatch(setEditedCost(data))
    }

  } 

  const showComments = () => {
    contextType.showComments()
    setEditOn(false)
  }

  useMemo(() => {
    if(contextType.commentsOn){
      setEditOn(false)
    }
  }, [contextType.commentsOn])
  return (
    <div className="main_container">
      <div className="header">
        <span className="user_name">{`${contextType.commentsOn ? "Leave a comment" : name}`}</span>
        <div className="chat_img" onClick={showComments}>
          { !contextType.commentsOn &&
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9062 9.49219C14.4456 9.49219 14.8828 9.05497 14.8828 8.51562C14.8828 7.97628 14.4456 7.53906 13.9062 7.53906C13.3669 7.53906 12.9297 7.97628 12.9297 8.51562C12.9297 9.05497 13.3669 9.49219 13.9062 9.49219Z" fill="#222222B2"/>
            <path d="M10 9.49219C10.5393 9.49219 10.9766 9.05497 10.9766 8.51562C10.9766 7.97628 10.5393 7.53906 10 7.53906C9.46066 7.53906 9.02344 7.97628 9.02344 8.51562C9.02344 9.05497 9.46066 9.49219 10 9.49219Z" fill="#222222B2"/>
            <path d="M6.09375 9.49219C6.63309 9.49219 7.07031 9.05497 7.07031 8.51562C7.07031 7.97628 6.63309 7.53906 6.09375 7.53906C5.55441 7.53906 5.11719 7.97628 5.11719 8.51562C5.11719 9.05497 5.55441 9.49219 6.09375 9.49219Z" fill="#222222B2"/>
            <path d="M19.2188 0H0.78125C0.349766 0 0 0.349766 0 0.78125V16.25C0 16.6815 0.349766 17.0312 0.78125 17.0312H7.69441L9.33945 19.6359C9.48262 19.8626 9.73195 20 10 20C10.268 20 10.5174 19.8626 10.6605 19.6359L12.3056 17.0312H19.2188C19.6502 17.0312 20 16.6815 20 16.25V0.78125C20 0.349766 19.6502 0 19.2188 0ZM18.4375 15.4688H11.875C11.607 15.4688 11.3576 15.6062 11.2145 15.8328L10 17.7557L8.78555 15.8328C8.64238 15.6062 8.39305 15.4688 8.125 15.4688H1.5625V1.5625H18.4375V15.4688Z" fill="#222222B2"/>
          </svg>
          }
          { contextType.commentsOn &&
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.9062 9.49219C14.4456 9.49219 14.8828 9.05497 14.8828 8.51562C14.8828 7.97628 14.4456 7.53906 13.9062 7.53906C13.3669 7.53906 12.9297 7.97628 12.9297 8.51562C12.9297 9.05497 13.3669 9.49219 13.9062 9.49219Z" fill="#009C98"/>
            <path d="M10 9.49219C10.5393 9.49219 10.9766 9.05497 10.9766 8.51562C10.9766 7.97628 10.5393 7.53906 10 7.53906C9.46066 7.53906 9.02344 7.97628 9.02344 8.51562C9.02344 9.05497 9.46066 9.49219 10 9.49219Z" fill="#009C98"/>
            <path d="M6.09375 9.49219C6.63309 9.49219 7.07031 9.05497 7.07031 8.51562C7.07031 7.97628 6.63309 7.53906 6.09375 7.53906C5.55441 7.53906 5.11719 7.97628 5.11719 8.51562C5.11719 9.05497 5.55441 9.49219 6.09375 9.49219Z" fill="#009C98"/>
            <path d="M19.2188 0H0.78125C0.349766 0 0 0.349766 0 0.78125V16.25C0 16.6815 0.349766 17.0312 0.78125 17.0312H7.69441L9.33945 19.6359C9.48262 19.8626 9.73195 20 10 20C10.268 20 10.5174 19.8626 10.6605 19.6359L12.3056 17.0312H19.2188C19.6502 17.0312 20 16.6815 20 16.25V0.78125C20 0.349766 19.6502 0 19.2188 0ZM18.4375 15.4688H11.875C11.607 15.4688 11.3576 15.6062 11.2145 15.8328L10 17.7557L8.78555 15.8328C8.64238 15.6062 8.39305 15.4688 8.125 15.4688H1.5625V1.5625H18.4375V15.4688Z" fill="#009C98"/>
          </svg>
          }
        </div>
        <div className={`comments_counter ${comments.length ? "" : "empty_comments"} ${contextType.commentsOn ? "open" : "closed"}`}>{comments.length}</div>
        <div className="download_img">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.46995 12.0303C7.53959 12.1 7.62227 12.1552 7.71327 12.1929C7.80427 12.2306 7.9018 12.25 8.00029 12.25C8.09879 12.25 8.19632 12.2306 8.28731 12.1929C8.37831 12.1552 8.46099 12.1 8.53064 12.0303L11.359 9.20191C11.4997 9.06125 11.5787 8.87049 11.5787 8.67158C11.5787 8.47267 11.4997 8.2819 11.359 8.14125C11.2184 8.0006 11.0276 7.92158 10.8287 7.92158C10.6298 7.92158 10.439 8.0006 10.2984 8.14125L8.75029 9.68934V1.5C8.75029 1.30109 8.67127 1.11032 8.53062 0.96967C8.38997 0.829018 8.19921 0.75 8.00029 0.75C7.80138 0.75 7.61061 0.829018 7.46996 0.96967C7.32931 1.11032 7.25029 1.30109 7.25029 1.5V9.68934L5.7022 8.14125C5.56155 8.0006 5.37078 7.92158 5.17187 7.92158C4.97296 7.92158 4.7822 8.0006 4.64154 8.14125C4.50089 8.2819 4.42188 8.47267 4.42188 8.67158C4.42188 8.87049 4.50089 9.06125 4.64154 9.20191L7.46995 12.0303Z" fill="#222222B2"/>
            <path d="M14.5 7.25C14.3011 7.25 14.1103 7.32902 13.9697 7.46967C13.829 7.61032 13.75 7.80109 13.75 8V13.75H2.25V8C2.25 7.80109 2.17098 7.61032 2.03033 7.46967C1.88968 7.32902 1.69891 7.25 1.5 7.25C1.30109 7.25 1.11032 7.32902 0.96967 7.46967C0.829018 7.61032 0.75 7.80109 0.75 8V14C0.75 14.3315 0.881696 14.6495 1.11612 14.8839C1.35054 15.1183 1.66848 15.25 2 15.25H14C14.3315 15.25 14.6495 15.1183 14.8839 14.8839C15.1183 14.6495 15.25 14.3315 15.25 14V8C15.25 7.80109 15.171 7.61032 15.0303 7.46967C14.8897 7.32902 14.6989 7.25 14.5 7.25Z" fill="#222222B2"/>
          </svg>
        </div>
        {!editOn &&
        <div className="edit_btn" onClick={editPage}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_807_967)">
            <path d="M14.7855 9.00032C14.4305 9.00032 14.1426 9.28813 14.1426 9.64318V16.0716C14.1426 16.4267 13.8548 16.7145 13.4998 16.7145H1.92855C1.5735 16.7145 1.28568 16.4267 1.28568 16.0716V3.21468C1.28568 2.85963 1.5735 2.57182 1.92855 2.57182H9.64273C9.99778 2.57182 10.2856 2.284 10.2856 1.92896C10.2856 1.57391 9.99778 1.28613 9.64273 1.28613H1.92855C0.863439 1.28613 0 2.14957 0 3.21468V16.0716C0 17.1367 0.863439 18.0002 1.92855 18.0002H13.4998C14.5649 18.0002 15.4284 17.1367 15.4284 16.0716V9.64314C15.4284 9.28813 15.1406 9.00032 14.7855 9.00032Z" fill="#222222B2"/>
            <path d="M17.2794 0.72088C16.8178 0.259234 16.1918 -6.51633e-05 15.539 1.01705e-05C14.8858 -0.00187318 14.2591 0.257878 13.7988 0.721294L5.33115 9.18821C5.2609 9.25899 5.20791 9.34502 5.17623 9.43956L3.89054 13.2967C3.77834 13.6335 3.96045 13.9975 4.29731 14.1097C4.36266 14.1315 4.4311 14.1426 4.49996 14.1427C4.56896 14.1425 4.63755 14.1315 4.7031 14.1099L8.56019 12.8242C8.65492 12.7926 8.74099 12.7393 8.81154 12.6686L17.2791 4.20104C18.2402 3.24008 18.2403 1.68195 17.2794 0.72088ZM16.3702 3.29266L8.01311 11.6497L5.51629 12.4835L6.34748 9.98984L14.7077 1.63283C15.1673 1.17413 15.9118 1.17488 16.3705 1.63449C16.5896 1.85405 16.7131 2.15128 16.7141 2.46147C16.7148 2.77331 16.591 3.07254 16.3702 3.29266Z" fill="#222222B2"/>
            </g>
            <defs>
            <clipPath id="clip0_807_967">
              <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        }
        {editOn &&
        <div className="edit_btn" onClick={editPage}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_807_967)">
            <path d="M14.7855 9.00032C14.4305 9.00032 14.1426 9.28813 14.1426 9.64318V16.0716C14.1426 16.4267 13.8548 16.7145 13.4998 16.7145H1.92855C1.5735 16.7145 1.28568 16.4267 1.28568 16.0716V3.21468C1.28568 2.85963 1.5735 2.57182 1.92855 2.57182H9.64273C9.99778 2.57182 10.2856 2.284 10.2856 1.92896C10.2856 1.57391 9.99778 1.28613 9.64273 1.28613H1.92855C0.863439 1.28613 0 2.14957 0 3.21468V16.0716C0 17.1367 0.863439 18.0002 1.92855 18.0002H13.4998C14.5649 18.0002 15.4284 17.1367 15.4284 16.0716V9.64314C15.4284 9.28813 15.1406 9.00032 14.7855 9.00032Z" fill="#009C98"/>
            <path d="M17.2794 0.72088C16.8178 0.259234 16.1918 -6.51633e-05 15.539 1.01705e-05C14.8858 -0.00187318 14.2591 0.257878 13.7988 0.721294L5.33115 9.18821C5.2609 9.25899 5.20791 9.34502 5.17623 9.43956L3.89054 13.2967C3.77834 13.6335 3.96045 13.9975 4.29731 14.1097C4.36266 14.1315 4.4311 14.1426 4.49996 14.1427C4.56896 14.1425 4.63755 14.1315 4.7031 14.1099L8.56019 12.8242C8.65492 12.7926 8.74099 12.7393 8.81154 12.6686L17.2791 4.20104C18.2402 3.24008 18.2403 1.68195 17.2794 0.72088ZM16.3702 3.29266L8.01311 11.6497L5.51629 12.4835L6.34748 9.98984L14.7077 1.63283C15.1673 1.17413 15.9118 1.17488 16.3705 1.63449C16.5896 1.85405 16.7131 2.15128 16.7141 2.46147C16.7148 2.77331 16.591 3.07254 16.3702 3.29266Z" fill="#009C98"/>
            </g>
            <defs>
            <clipPath id="clip0_807_967">
              <rect width="18" height="18" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        }
        <div className="vert_row" />
        <img src={closeButton} className="close_button" onClick={closeWindow}/>
      </div>
      {!editOn && !contextType.commentsOn &&
      <>
      <div className="row" />
      <div className="div_info_row">
        <img src={calendar} className="calendar" />
        <span className="info_text">LAST SINCE</span>
        <span className="info_data">01 Sep, 2021</span>
      </div>
      <div className="row2" />
      <div className="div_info_row">
        <img src={dot} className="dot" />
        <span className="info_text">SALARY ({checkCurrency(currency)})</span>
        <span className="info_data">{currency}{salary}</span>
      </div>
      <div className="row2 grey" />
      <div className="div_info_row grey">
        <img src={dot} className="dot" />
        <span className="info_text">HOURLY RATE ({checkCurrency(currencyRatePerHour)})</span>
        <span className="info_data">{currencyRatePerHour}{hourlyRate}/h</span>
      </div>
      <div className="row2 grey" />
      <div className="div_info_row grey">
        <img src={dot} className="dot" />
        <span className="info_text">HOURS WORKED</span>
        <span className="info_data">{totalHours}</span>
      </div>
      <div className="row2 grey" />
      <div className="div_info_row grey">
        <img src={dot} className="dot" />
        <span className="info_text">OVERTIME SALARY ({checkCurrency(currency)})</span>
        <span className="info_data">{currency}{overtimeSalary}</span>
      </div>
      <div className="row2 grey" />
      <div className="div_info_row">
        <img src={dot} className="dot" />
        <span className="info_text">TOTAL SALARY ({checkCurrency(currency)})</span>
        <span className="info_data">{currency}{totalSalary}</span>
      </div>
      <div className="row2" />
      <div className="div_info_row">
        <img src={dot} className="dot" />
        <span className="info_text">EXTRA COASTS (UAH)</span>
        <div className="info_grn">
          <span className="info_data">{extraCosts ? extraCosts : "0"}</span>
          <span className="grn">грн</span>
        </div>
        <span className="extra_costs">For the keyboard</span>
      </div>
      <div className="row2" />
      <div className="div_info_row">
        <img src={cash} className="cash" />
        <span className="info_text">TO PAY (UAH)</span>
        <div className="info_grn">
          <span className="info_data">₴{toPaySalary}</span>
          <span className="grn">грн</span>
        </div>
        {!checked &&
          <div className="topay">
            <span className="payed">NOT PAYED</span>
            <div className="checkbox" onClick={toPayCheck} />
          </div>
        }     
        {checked &&
        <div className="topay">
          <span className="payed checked">PAYED</span>
          <div className="checkbox_checked" onClick={toPayCheck}>
            <div className="checkbox_img">
            <img src={checkImg} className="img" />
            </div>
          </div>
        </div>
        }
      </div>
      <div className="projects_info">
        <ProjectData userId={id}/>
      </div>
      </>
      }
      {editOn && !contextType.commentsOn &&
        <>
        <div className="row" />
        <div className="div_info_row">
          <img src={calendar} className="calendar" />
          <span className="info_text">LAST SINCE</span>
          <div className="info_container">
            <div className="info_data_edited data">
              <span>01 Sep, 2021</span>
              <img src={upArrow} className="up_arrow"/>
            </div>
          </div>  
        </div>
        <div className="row2" />
        <div className={`div_info_row ${salaryError ? "error" : ""}`}>
          <img src={dot} className="dot" />
          <span className="info_text">SALARY</span>
          <div className="currency_select_edited">
            <CurrencySelect currencyValue={newSalaryFlag} changeSalary={changeSalaryFlag}/>
          </div>
          <div className="info_container">
            <div className={`info_data_edited ${salaryError ? "error" : ""}`}>
              <span>{changeIcon(newSalaryFlag)}</span>
              <textarea className="change_currency_info" onChange={changeSalary} value={newSalary} />
            </div>
            <span className={`error_show ${salaryError ? "show" : "hide"}`}>
              Some error
            </span>
          </div>
        </div>
        <div className="row2 grey" />
        <div className={`div_info_row grey ${hourlyRateError ? "error" : ""}`}>
          <img src={dot} className="dot" />
          <span className="info_text">HOURLY RATE</span>
          <div className="currency_select_edited">
            <CurrencySelect currencyValue={newHourlyRateFlag} changeHourlyRate={changeHourlyRateFlag}/>
          </div>
          <div className="info_container">
            <div className={`info_data_edited ${hourlyRateError ? "error" : ""}`}>
              <span>{changeIcon(newHourlyRateFlag)}</span>
              <textarea className="change_currency_info" onChange={changeHourlyRate} value={newHourlyRate} />
              <span>/h</span>
            </div>
            <span className={`error_show ${hourlyRateError ? "show" : "hide"}`}>
              Some error
            </span>
          </div>
        </div>
        <div className="row2 grey" />
        <div className="div_info_row grey">
          <img src={dot} className="dot" />
          <span className="info_text">HOURS WORKED</span>
          <span className="info_data">{totalHours}</span>
        </div>
        <div className="row2 grey" />
        <div className="div_info_row grey">
          <img src={dot} className="dot" />
          <span className="info_text">OVERTIME SALARY ({checkCurrency(currency)})</span>
          <span className="info_data">{currency}{overtimeSalary}</span>
        </div>
        <div className="row2 grey" />
        <div className="div_info_row">
          <img src={dot} className="dot" />
          <span className="info_text">TOTAL SALARY ({checkCurrency(currency)})</span>
          <span className="info_data">{currency}{totalSalary}</span>
        </div>
        <div className="row2" />
        <div className="div_info_row">
          <img src={dot} className="dot" />
          <span className="info_text">EXTRA COASTS</span>
          <div className="currency_select_edited">
            <CurrencySelect currencyValue={newExtraCostsFlag} changeExtraCosts={changeExtraCostsFlag}/>
          </div>
          <div className="info_grn_edited">
            <textarea className="change_currency_info" onChange={changeExtraCosts} value={newExtraCosts ? newExtraCosts : "0"} />
            <span className={`grn ${newExtraCostsFlag ? "full" : "empty"}`}>{changeText(newExtraCostsFlag)}</span>
            <span className={`grn ${newExtraCostsFlag ? "empty" : "full"}`}>грн</span>
          </div>
          <div className="extra_costs edited">For the keyboard</div>
        </div>
        <div className="row2" />
        <div className="div_info_row">
          <img src={cash} className="cash" />
          <span className="info_text">TO PAY (UAH)</span>
          <div className="info_grn">
            <span className="info_data">₴{toPaySalary}</span>
            <span className="grn">грн</span>
          </div>
          {!checked &&
            <div className="topay">
              <span className="payed edited">PAYED</span>
              <div className="checkbox edited"/>
            </div>
          }     
          {checked &&
          <div className="topay">
            <span className="payed checked edited">PAYED</span>
            <div className="checkbox_checked edited">
              <div className="checkbox_img edited">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.8399 0H3.16011C1.41756 0 0 1.41756 0 3.16011V16.8399C0 18.5824 1.41756 20 3.16011 20H16.8399C18.5824 20 20 18.5824 20 16.8399V3.16011C20 1.41756 18.5824 0 16.8399 0ZM17.8932 16.8399C17.8932 17.4207 17.4207 17.8932 16.8399 17.8932H3.16011C2.57933 17.8932 2.10683 17.4207 2.10683 16.8399V3.16011C2.10683 2.57933 2.57939 2.10683 3.16011 2.10683H16.8399C17.4207 2.10683 17.8932 2.57939 17.8932 3.16011V16.8399H17.8932Z" fill="#ADADA7"/>
              <path d="M13.88 5.92188C13.5402 5.92188 13.2208 6.05426 12.9805 6.29465L8.27391 11.0089L7.01946 9.75459C6.7793 9.51437 6.45996 9.38204 6.1203 9.38204C5.78058 9.38204 5.46124 9.51437 5.22102 9.75454C4.98086 9.9947 4.84863 10.314 4.84863 10.6537C4.84863 10.9934 4.98086 11.3127 5.22102 11.5528L7.37491 13.7067C7.61507 13.9469 7.93441 14.0793 8.27413 14.0793C8.61368 14.0793 8.93313 13.9469 9.17357 13.7065L14.7792 8.09282C15.2749 7.59693 15.2748 6.79015 14.7792 6.29426C14.539 6.05415 14.2196 5.92188 13.88 5.92188Z" fill="#ADADA7"/>
              </svg>
              </div>
            </div>
          </div>
          }
        </div>
        <div className="projects_info">
          <ProjectData userId={id}/>
        </div>
        <div className="main_container_footer">
          <div className="save_changes" onClick={saveNewData}>Save changes</div>
          <div className="cancel_changes" onClick={closeWindow}>Cancel</div>
        </div>
        </>
      }
      {!editOn && contextType.commentsOn &&
        <div className="comment_container">
          <CreateComment selectedDate={selectedDate} commentsId={commentsId} id={id} />
          <div className="all_user_comments">
            {comments && comments.map(comment => (
            <UserComment text={comment} key={commentsId} 
          //  url={avatarUrl}
            />
            ))
            }
          </div>
          <div className="comment_footer">
            <div className="footer_close_button" onClick={closeWindow}>
                Done
            </div>
        </div>
        </div>
      }
    </div>
  )
}
export default WindowUserInfo;