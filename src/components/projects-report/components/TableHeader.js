import React from 'react'

import { ADMIN, DEVELOPER, PM } from 'constants/role-constant'

export default function TableHeader({ roleUser, userRolePM }) {
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
          <div className="table_cell total">Overtime salary, total</div>
          <div className="table_cell total">Total salary</div>
          <div className="table_cell coast">Extra costs, UAH</div>
          <div className="table_cell to_pay">Total to pay, UAH</div>
        </>
      )}
      {userRolePM && (
        <>
          <div className="table_cell salary">Salary</div>
          <div className="table_cell rate">Rate</div>
          <div className="table_cell hours">Hours</div>
          <div className="table_cell total">Overtime salary, total</div>
          <div className="table_cell total">Total salary</div>
          <div className="table_cell coast">Extra costs, UAH</div>
          <div className="table_cell to_pay">Total to pay, UAH</div>
        </>
      )}
      {roleUser === PM && (
        <>
          <div className="table_cell hours">Hours</div>
        </>
      )}
      {roleUser !== DEVELOPER && (
        <>
          <div className="table_cell comment">Comments</div>
            {roleUser !== PM && (
                <div className="table_cell ready">Payed</div>
            )}
            </>
      )}

    </div>
  )
}
