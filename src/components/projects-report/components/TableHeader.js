import React from 'react'

import { ADMIN, DEVELOPER, PM } from 'constants/role-constant'

export default function TableHeader({ roleUser }) {
  return (
    <div className="table_header_container">
      <div className="table_cell name">
        <span>Name</span>
      </div>
      <div className="table_cell project_name">
        <span>Projects</span>
      </div>
      {roleUser !== PM && (
        <>
          <div className="table_cell salary">Salary</div>
          <div className="table_cell rate">Rate</div>
          <div className="table_cell hours">Hours</div>
          <div className="table_cell total">Total</div>
          <div className="table_cell total">Total USD</div>
          <div className="table_cell to_pay">To pay</div>
          <div className="table_cell coast">Costs</div>
        </>)}
      {roleUser === PM && (
        <>
          <div className="table_cell hours">Hours</div>
        </>
      )}
      {roleUser !== DEVELOPER && (
        <>
          <div className="table_cell comment">Comments</div>
          <div className="table_cell ready">Ready</div>
        </>
      )}

    </div>
  )
}
