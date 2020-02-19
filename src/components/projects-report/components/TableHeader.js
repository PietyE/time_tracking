import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function TableHeader() {
  return (
    <div className="table_header_container">
      <div className="table_cell name sort">
        <span>
          Name <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className="table_cell name sort">
        <span>
          Projects <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className="table_cell">Salary</div>
      <div className="table_cell">Rate</div>
      <div className="table_cell">Hours</div>
      <div className="table_cell">Total</div>
      <div className="table_cell">Total USD</div>
      <div className="table_cell">To pay</div>
      <div className="table_cell">Costs</div>
    </div>
  )
}
