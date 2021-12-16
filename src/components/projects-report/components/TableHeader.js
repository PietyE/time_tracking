import React from 'react'

import { ADMIN, DEVELOPER, PM } from 'constants/role-constant'
import SortButton from '../../project-management/components/SortButton'

export default function TableHeader({ roleUser, onSortPress }) {
  return (
    <div className="table_header_container">
      <div className="table_cell name">
        <span>Name</span>
        <SortButton name="name" onSortPress={onSortPress}/>
      </div>
      <div className="table_cell project_name">
        <span>Projects</span>
        <SortButton name="developer_projects" onSortPress={onSortPress}/>
      </div>
      {roleUser !== PM && (
        <>
          <div className="table_cell salary">
            Salary
            <SortButton name="salary_uah" onSortPress={onSortPress}/>
          </div>
          <div className="table_cell rate">
            Rate
            <SortButton name="rate_uah" onSortPress={onSortPress}/>
          </div>
          <div className="table_cell hours">
            Hours
            <SortButton name="totalHoursOvertime" onSortPress={onSortPress}/>
          </div>
          <div className="table_cell total">Overtime salary, total</div>
          <div className="table_cell total">Total salary</div>
          <div className="table_cell coast">Extra costs, UAH</div>
          <div className="table_cell to_pay">Total to pay, UAH</div>
        </>)}
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
