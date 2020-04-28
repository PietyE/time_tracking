import React from 'react'
import { Link } from 'react-router-dom'

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

  const hoursString =
    roundHours(totalHoursOvertime / 60) || roundHours(hours / 60) || 0

  return (
    <div className={`table_body_item_row ${extraClass}`} onClick={onClick}>
      <span className="table_cell name">
        <span> {userName}</span>
      </span>
      <span className="table_cell project_name">
        <span>
          {extraClass === 'common' ? (
            projectName
          ) : (
            <Link
              to={{
                pathname: '/timereport',
                state: {
                  developer_project_id,
                  selectedDate,
                },
              }}
            >
              {projectName}
            </Link>
          )}
        </span>
      </span>
      <span className="table_cell">
        {extraClass === 'common' ? usdFormat.format(projectSalary) : ''}
      </span>
      <span className="table_cell">{usdFormat.format(rate)}</span>
      <span className="table_cell">
        {is_full_time ? 'fulltime' : `${hoursString} h`}
      </span>
      <span className="table_cell">
        {usdFormat.format(total_overtimes || total)}
      </span>
      <span className="table_cell">
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
