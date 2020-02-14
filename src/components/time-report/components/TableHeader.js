import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function TableHeader() {
  return (
    <div className="table_header_container">
      <div className="table_cell name">
        <span>Name</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div className="table_cell name">Project</div>
      <div className="table_cell">Salary</div>
      <div className="table_cell">Rate</div>
      <div className="table_cell">Hours</div>
      <div className="table_cell">Total</div>
      <div className="table_cell">Total USD</div>
      <div className="table_cell">to pay</div>
      <div className="table_cell">costs</div>
    </div>
  )
}
