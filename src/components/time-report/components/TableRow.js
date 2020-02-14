import React from 'react'

export default function TableRow({ project, extraClass = '', name }) {
  const { projectName, projectSalary, projectRate, hours } = project
  const total = projectRate * hours
  const totalUSD = projectSalary + total
  const toPay = totalUSD * 24
  const coast = '+2000грн'
  return (
    <div className={`table_body_item_row ${extraClass}`}>
      <span className="table_cell name">{name}</span>
      <span className="table_cell name">{projectName}</span>
      <span className="table_cell">{projectSalary}</span>
      <span className="table_cell">{projectRate}</span>
      <span className="table_cell">{hours}</span>
      <span className="table_cell">{total}</span>
      <span className="table_cell">{totalUSD}</span>
      <span className="table_cell">{toPay} грн</span>
      <span className="table_cell">{coast}</span>
    </div>
  )
}
