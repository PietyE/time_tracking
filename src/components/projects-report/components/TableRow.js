import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { DEVELOPER } from 'constants/role-constant'

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
  editingUserId = '',
}) {
  const {
    working_time: hours,
    id: developer_project_id,
    total,
    name: projectName,
  } = project

  const toPay = total_salary * 24 // change this shit

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
    e.stopPropagation()
    const userID = e.currentTarget.dataset.userid
    setEditUserId(userID)
  }

  const hoursString =
    roundHours(totalHoursOvertime / 60) || roundHours(hours / 60) || 0

  let stateDataForLink = {
    userId,
    developer_project_id,
    selectedDate,
  }

  return (
    <div className={`table_body_item_row ${extraClass}`} onClick={onClick}>
      <span className="table_cell name">
        {roleUser !== DEVELOPER && extraClass === 'common' && (
          <span
            className="edit_button"
            onClick={handlerEditClick}
            data-userid={userId}
          >
            <FontAwesomeIcon icon={faEdit} />
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
      <span className="table_cell">
        {extraClass === 'common' ? UAHFormat.format(toPay) : ''}
      </span>
      <span className="table_cell">
        {extraClass === 'common' ? UAHFormat.format(total_expenses) : ''}
      </span>
    </div>
  )
}
