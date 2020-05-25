import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faComments } from '@fortawesome/free-solid-svg-icons'
import { Overlay, Popover, OverlayTrigger } from 'react-bootstrap'

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
  setIsOpenEdit,
}) {
  const {
    working_time: hours,
    id: developer_project_id,
    total,
    name: projectName,
  } = project

  const popoverRef = useRef(null)
  const [showPopoverComment, setShowPopoverComment] = useState(false)
  const [popoverTarget, setPopoverTarget] = useState(null)

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
    setIsOpenEdit(true)
  }

  const handleShowPopover = (e) => {
    e.stopPropagation()
    setShowPopoverComment(!showPopoverComment)
    setPopoverTarget(e.target)
  }

  const hoursString =
    roundHours(totalHoursOvertime / 60) || roundHours(hours / 60) || 0

  let stateDataForLink = {
    userId,
    developer_project_id,
    selectedDate,
  }

  return (
    <>
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
        <span className="table_cell coast">
          {extraClass === 'common' ? UAHFormat.format(total_expenses) : ''}
        </span>
        {roleUser !== DEVELOPER && (
          <span className="table_cell comment">
            {extraClass === 'common' ? (
              <OverlayTrigger
                placement="left"
                containerPadding={20}
                trigger="hover"
                key={userId}
                overlay={
                  <Popover id="popover-basic">
                    <Popover.Title as="h3">Comment</Popover.Title>
                    <Popover.Content>
                      {
                        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia'
                      }
                    </Popover.Content>
                  </Popover>
                }
              >
                <FontAwesomeIcon icon={faComments} />
              </OverlayTrigger>
            ) : (
              ''
            )}
          </span>
        )}
      </div>
    </>
  )
}

/**
 * 
 *     <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
                laudantium ea odio cum veniam nulla molestias, laborum natus
                quos hic nemo veritatis. Commodi accusantium error dolore.
                Accusamus maxime debitis perferendis.
              </span>
 */
