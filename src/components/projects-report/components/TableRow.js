import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
  faChevronDown,
  faChevronUp,
  faComments,
} from '@fortawesome/free-solid-svg-icons'
import { Popover, OverlayTrigger } from 'react-bootstrap'

import { ACCOUNTANT, ADMIN, DEVELOPER, PM } from 'constants/role-constant'

export default function TableRow({
  project,
  extraClass = '',
  name: userName,
  rate,
  onClick,
  projectSalary,
  selectedDate = {},
  total_expenses = '',
  total_overtimes = '',
  total_salary = '',
  is_full_time = false,
  totalHoursOvertime,
  userId,
  roleUser,
  setEditUserId,
  setIsOpenEdit,
  comment,
  total_uah,
  is_processed,
  setProcessedStatus,
  isOpen,
  isFetchingReports
}) {
  // const {
  //   working_time: hours,
  //   id: developer_project_id,
  //   total,
  //   name: projectName,
  // } = project

  const {
    working_time: hours,
    id: developer_project_id,
    total,
    name: projectName,
  } = {}

  const [isProcessed, setIsProcessed] = useState(false)

  const roundHours = (hours) => {
    return parseFloat(hours.toFixed(2))
  }

  const usdFormat = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
  })

  const UAHFormat = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  })

  const handlerEditClick = (e) => {

    if (e.target.type === 'checkbox') {
      return
    }
    e.stopPropagation()
    const userID = e.currentTarget.dataset.userid
    setEditUserId(userID)
    setIsOpenEdit(true)
  }

  const handleTableRowClick = (event) => {
    if (extraClass !== 'common') {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (roleUser === ADMIN || roleUser === ACCOUNTANT) {
      handlerEditClick(event)
      return
    }
    if (roleUser === DEVELOPER || roleUser === PM) {
      if (onClick && onClick instanceof Function) {
        onClick(event)
      }
    }
  }

  const hoursString =
    roundHours(totalHoursOvertime / 60) || roundHours(hours / 60) || 0

  let stateDataForLink = {
    userId,
    developer_project_id,
    selectedDate,
  }

  const handlerChangeProcessedStatusInput = (e) => {
    if (isFetchingReports) {
      return;
    }
    e.stopPropagation()
    setProcessedStatus({
      id: userId,
      month: selectedDate.month + 1,
      year: selectedDate.year,
    })
  }

  useEffect(() => {
    setIsProcessed(is_processed)
  }, [is_processed])

  return (
    <>
      <div className={`table_body_item_row ${extraClass}`}>
        <div
          className="table_body_item_row"
          data-userid={userId}
          onClick={handleTableRowClick}
        >
          <span className="table_cell name">
            {extraClass === 'common' && (
              <span
                className="edit_button"
                onClick={onClick}
                data-userid={userId}
              >
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
              </span>
            )}
            <span className="name_text">{userName}</span>
          </span>
          <span className="table_cell project_name">
            <span>
              {extraClass === 'common' ? (
                projectName
              ) : (
                <Link
                  to={{
                    pathname: '/timereport',
                    state: stateDataForLink,
                  }}
                >
                  {projectName}
                </Link>
              )}
            </span>
          </span>

          {roleUser !== PM && (
            <>
              <span className="table_cell salary">
                {extraClass === 'common' ? usdFormat.format(projectSalary) : ''}
              </span>
              <span className="table_cell rate">{usdFormat.format(rate)}</span>
              <span className="table_cell hours">
                {is_full_time ? 'fulltime' : `${hoursString} h`}
              </span>
              <span className="table_cell total">
                {usdFormat.format(total_overtimes || total)}
              </span>
              <span className="table_cell total">
                {extraClass === 'common' ? usdFormat.format(total_salary) : ''}
              </span>
              <span className="table_cell to_pay">
                {extraClass === 'common' ? UAHFormat.format(total_uah) : ''}
              </span>
              <span className="table_cell coast">
                {extraClass === 'common'
                  ? UAHFormat.format(total_expenses)
                  : ''}
              </span>
            </>
          )}

          {roleUser === PM && (
            <span className="table_cell hours">
              {is_full_time ? 'fulltime' : `${hoursString} h`}
            </span>
          )}

          {roleUser !== DEVELOPER && (
            <>
              <span className="table_cell comment">
                {extraClass === 'common' && comment ? (
                  <OverlayTrigger
                    placement="left"
                    containerPadding={20}
                    trigger={['focus', 'hover']}
                    key={userId}
                    overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">Comment</Popover.Title>
                        <Popover.Content>{comment}</Popover.Content>
                      </Popover>
                    }
                  >
                    <FontAwesomeIcon icon={faComments} />
                  </OverlayTrigger>
                ) : (
                  ''
                )}
              </span>
              <span className="table_cell ready">
                {extraClass === 'common' && (
                  <input
                    type="checkbox"
                    checked={isProcessed}
                    onChange={handlerChangeProcessedStatusInput}
                  />
                )}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  )
}
