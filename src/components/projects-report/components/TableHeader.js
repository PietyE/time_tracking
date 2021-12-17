import React, { useCallback, useState } from 'react'

import { DEVELOPER, PM } from 'constants/role-constant'
import SortButton from '../../project-management/components/SortButton'

export default function TableHeader({ roleUser, onSortPress }) {
  const [currentSort, setCurrent] = useState(null);

  const handleSortPress = useCallback((data) => {
    onSortPress(data);
    setCurrent(data?.key);
  }, []);

  return (
    <div className="table_header_container">
      <div className="table_cell name">
        <span>Name</span>
        <SortButton
          name="name"
          current={currentSort}
          onSortPress={handleSortPress}
        />
      </div>
      <div className="table_cell project_name">
        <span>Projects</span>
        <SortButton
          name="developer_projects"
          current={currentSort}
          onSortPress={handleSortPress}
        />
      </div>
      {roleUser !== PM && (
        <>
          <div className="table_cell salary">
            Salary
            <SortButton
              name="salary_uah"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell rate">
            Rate
            <SortButton
              name="rate_uah"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell hours">
            Hours
            <SortButton
              name="totalHoursOvertime"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell total">
            Overtime salary, total
            <SortButton
              name="total_overtimes"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell total">
            <span>
              Total salary
            </span>
            <SortButton
              name="total"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell coast">
            Extra costs, UAH
            <SortButton
              name="total_expenses"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
          <div className="table_cell to_pay">
            Total to pay, UAH
            <SortButton
              name="total_uah"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
        </>)}
      {roleUser === PM && (
        <>
          <div className="table_cell hours">
            Hours
            <SortButton
              name="totalHoursOvertime"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
        </>
      )}
      {roleUser !== DEVELOPER && (
        <>
          <div className="table_cell comment">
            Comments
            <SortButton
              name="comments"
              current={currentSort}
              onSortPress={handleSortPress}
            />
          </div>
            {roleUser !== PM && (
                <div className="table_cell ready">
                  Payed
                  <SortButton
                    name="is_processed"
                    current={currentSort}
                    onSortPress={handleSortPress}
                  />
                </div>
            )}
        </>
      )}
    </div>
  )
}
