import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';

import SearchByProject from '../SearchByProject';
import SearchByDeveloper from '../SearchByDeveloper';
import UsersInfo from '../UsersInfo';
import DropDownCurrencyChange from '../DropDownCurrencyChange';

import { getSelectedDateTimeReport } from 'selectors/timereports';
import { getIsFetchingProjectsReport } from '../../../../selectors/developer-projects'

import { changeSelectedDateTimeReport } from 'actions/times-report'

import filter from 'images/inHouseEmployees/filter.svg';
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { EmployeesMainComponentContext } from 'context/employeesMainComponent-context';

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import SelectMonth from 'components/ui/select-month'
import Spinner from 'components/time-report/components/Spinner';

import './employeesMainComponent.scss'
import WindowUserInfo from '../WindowUserInfo';

function EmployeesMainComponent (props) {
  const {
    pageName
  } = props

  const [currencyValue, setCurrencyValue] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [userIsChecked, setUserIsChecked] = useState(false)
  const [currentCurrencyId, setCurrentCurrencyId] = useState(null);
  const selectedDate = useShallowEqualSelector(getSelectedDateTimeReport);
  const isFetchingProjects = useShallowEqualSelector(getIsFetchingProjectsReport);
  const [projectState, setProjectState] = useState("Active")
  const [openChooseActiveState, setOpenChooseActiveState] = useState(false)
  const [opened, setOpened] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [commentsOn, setUserCommentsOn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [check, setCheck] = useState("")
  const dispatch = useDispatch();

  const onSentNewData = (data) => {
    dispatch(changeSelectedDateTimeReport(data))
  }

  useEffect(() => {
    if(selected && selected.rate !== currencyValue) {
      setCurrencyValue(selected.rate)
      setCurrentCurrencyId(selected.currencyId)
    }
  }, [selected])

  const buttonRouteTo = useCallback((item) => {
    if (item) {
      setSelected(item)
    }
  }, [])

  const openChooseActive = () => {
    setOpenChooseActiveState(!openChooseActiveState);
  }

  const userWindowInfoOpen = (e) => {
    setOpenUserInfo(true)
  }

  const userWindowInfoClose = (e) => {
    setOpenUserInfo(false)
  }

  const selectUser = (user, checked) => {
    if (user) {
      if(user === userSelected){
        setUserSelected(userSelected)
        setCurrentUserId(userSelected.id)
        setCheck(userSelected.is_processed)
      } else {
        setUserSelected(user)
        setCurrentUserId(user.id)
      }
      if(checked !== userIsChecked){
        setUserIsChecked(!userIsChecked)
      }
    }
  }

  const showUserComments = () => {
    setUserCommentsOn(true)
  }

  const hideUserComments = () => {
    setUserCommentsOn(false)
  }

  const chooseActive = () => {
    setProjectState("Active")
  }

  const chooseArchieve = () => {
    setProjectState("Archieve")
  }

  const toPayCheck = () => {
    setCheck(!check)
  }

  return (
    <EmployeesMainComponentContext.Provider value={{selected,
                                              opened,
                                              currentUserId,
                                              commentsOn,
                                              check, 
                                              onItemClick: buttonRouteTo,
                                              showWindowWithUserInfo: userWindowInfoOpen,
                                              closeWindowWithUserInfo: userWindowInfoClose,
                                              chooseUser: selectUser,
                                              showComments: showUserComments,
                                              hideComments: hideUserComments,
                                              checkToPay: toPayCheck
                                              }}>
      <div className="in_house_employees_page">
        <div className="header">
          <span className="header_text">{pageName}</span>
          <div className="choose_currency">
            <DropDownCurrencyChange />
          </div>
        </div>
        <div className="row_2" />
        {isFetchingProjects && <Spinner />}
        <div className="search_container">
          <SearchByDeveloper />
          <div className="row">
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1.5" fill="#616161"/>
          </svg>
          </div>
          <SearchByProject />
          <div className="select_month">
            <SelectMonth
              selectedDate={selectedDate}
              setNewData={onSentNewData}
              extraClassNameContainer="time_report_header_select_month"
              showYear="true"
            />
          </div>
          <div className="choose_active" onClick={openChooseActive}>
            <img src={filter} className="choose_active_img" />
            <span className="choose_active_text">{projectState}</span>
            <div className="up_arrow_box">
              <img src={upArrow} className={`up_arrow ${openChooseActiveState ? "show_menu" : "close_menu"}`} />
            </div>
          </div>
          {openChooseActiveState && 
              <div className="choose_container">
                <span className="choose_text" onClick={chooseActive}>Active</span>
                <span className="choose_text" onClick={chooseArchieve}>Archive</span>
              </div>
            } 
        </div>
        <div>
          <UsersInfo selectedDate={selectedDate} commentsOn={commentsOn} />
        </div>
        {openUserInfo &&
          <WindowUserInfo name={userSelected.name}
                          id={userSelected.id}
                          check={userIsChecked}
                          salary={userSelected.salary_uah}
                          currency={userSelected.salaryCurrency}
                          hourlyRate={userSelected.rate_uah}
                          currencyRatePerHour={userSelected.rateCurrency}
                          totalHours={userSelected.totalHoursOvertime}
                          overtimeSalary={userSelected.total_overtimes}
                          totalSalary={userSelected.total}
                          extraCosts={userSelected.total_expenses}
                          toPaySalary={userSelected.total_uah}
                          expensesId={userSelected.expensesId}
                          is_processed={userSelected.is_processed}
                          comments={userSelected.comments}
                          commentsId={userSelected.commentId}
                          selectedDate={selectedDate}
                          commentsOn={commentsOn}
                           />
        }
      </div>
    </EmployeesMainComponentContext.Provider>
  )
}
export default EmployeesMainComponent;