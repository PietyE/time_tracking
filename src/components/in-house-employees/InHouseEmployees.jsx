import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';

import CurrencySelect from './components/CurrencySelect';
import SearchByProject from './components/SearchByProject';
import SearchByDeveloper from './components/SearchByDeveloper';
import UsersInfo from './components/UsersInfo';

import { getSelectedDateTimeReport } from 'selectors/timereports';
import { getIsFetchingProjectsReport } from '../../selectors/developer-projects'

import { getDevelopersProjectInProjectReport } from 'actions/projects-report';
import { changeSelectedDateTimeReport } from 'actions/times-report'
import { setExchangeRates } from 'actions/projects-report'

import check from 'images/inHouseEmployees/check.svg'
import filter from 'images/inHouseEmployees/filter.svg';
import upArrow from 'images/sideMenuIcons/upArrow.svg'

import { InHouseEmployeesContext } from 'context/inHouseEmployees-context';

import useShallowEqualSelector from 'custom-hook/useShallowEqualSelector'

import SelectMonth from 'components/ui/select-month'
import Spinner from 'components/time-report/components/Spinner';

import './inHouseEmployees.scss'

function InHouseEmployees () {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [selected, setSelected] = useState(null);
  const [currentCurrencyId, setCurrentCurrencyId] = useState(null);
  const selectedDate = useShallowEqualSelector(getSelectedDateTimeReport);
  const isFetchingProjects = useShallowEqualSelector(getIsFetchingProjectsReport);
  const [projectState, setProjectState] = useState("Active")
  const [openChooseActiveState, setOpenChooseActiveState] = useState(false)
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const getDevelopersProjects = useCallback(() => {
    dispatch(getDevelopersProjectInProjectReport())
  }, [])
  const onSentNewData = (data) => {
    dispatch(changeSelectedDateTimeReport(data))
  }

  useEffect(() => {
    if(selected && selected.rate !== currencyValue) {
      setCurrencyValue(selected.rate)
      setCurrentCurrencyId(selected.currencyId)
    }
  }, [selected])

  useEffect(() => {
    getDevelopersProjects()
  }, [])

  const buttonRouteTo = useCallback((item) => {
    if (item) {
      setSelected(item)
    }
  }, [])

  const changeValue = useCallback((e) => {
    if(e.target.value >= 0) {
      setCurrencyValue(e.target.value)
    } else {
      console.log("Write a positive number")
    }
  }, [])

  const handleSaveExchangeRate = () => {
    const data = {
      date: new Date(selectedDate.year, selectedDate.month + 1)
        .toISOString()
        .slice(0, 10),
      rate: currencyValue,
      currency: currentCurrencyId
    }
    dispatch(setExchangeRates(data, clearInput))
    setOpened(false)
    // setIsEdit(false)
  }

  const onOpen = () => {
    setOpened(!opened)
  }

  const clearInput = () => {
    setCurrencyValue('')
    setCurrentCurrencyId(null)
  }

  const openChooseActive = () => {
    setOpenChooseActiveState(!openChooseActiveState);
  }

  const chooseText = (e) => {
    // if(item){
    //   setProjectState(item)
    // }
  }


  return (
    <InHouseEmployeesContext.Provider value={{selected, opened, onOpenDropDown: onOpen, onItemClick: buttonRouteTo}}>
      <div className="in_house_employees_page">
        <div className="header">
          <span className="header_text">In-house-employees</span>
          <div className="selected_currency">
            <CurrencySelect />
          </div>
          <div className="row">
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1.5" fill="#616161"/>
            </svg>
          </div>
          <input type="number" className="currency_value" value={currencyValue} onChange={changeValue}/>
          { opened &&
          <div className="check_button">
            <img src={check} className="check" onClick={handleSaveExchangeRate}/>
          </div>
          }
          { !opened &&
          <div className="check_button_disabled">
            <img src={check} className="check"/>
          </div>
          }
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
                <span className="choose_text" value="Active" onClick={chooseText}>Active</span>
                <span className="choose_text">Archive</span>
              </div>
            } 
        </div>
        <div>
          <UsersInfo />
        </div>

      </div>
    </InHouseEmployeesContext.Provider>
  )
}
export default InHouseEmployees;