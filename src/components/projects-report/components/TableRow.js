import React from 'react'
import { Link } from 'react-router-dom'

export default function TableRow({
  project,
  extraClass = '',
  name,
  rate,
  onClick,
}) {
  const { projectName, projectSalary, hours } = project
  const total = rate * hours
  const totalUSD = projectSalary + total
  const toPay = totalUSD * 24
  const coast = '2000'

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

  return (
    <div className={`table_body_item_row ${extraClass}`} onClick={onClick}>
      <span className="table_cell name">
        <span> {name}</span>
      </span>
      <span className="table_cell name">
        <span>
          {extraClass === 'common' ? projectName : <Link>{projectName}</Link>}
        </span>
      </span>
      <span className="table_cell">{usdFormat.format(projectSalary)}</span>
      <span className="table_cell">{usdFormat.format(rate)}</span>
      <span className="table_cell">{hours} h</span>
      <span className="table_cell">{usdFormat.format(total)}</span>
      <span className="table_cell">{usdFormat.format(totalUSD)}</span>
      <span className="table_cell">{UAHFormat.format(toPay)}</span>
      <span className="table_cell">{UAHFormat.format(coast)}</span>
    </div>
  )
}
