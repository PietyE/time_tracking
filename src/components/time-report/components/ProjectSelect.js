import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'

function ProjectSelect({ menuList = [] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedСompany, setSelectedСompany] = useState(
    menuList[0].companyName
  )
  const handleSelectedItem = e => {
    setSelectedСompany(e.target.textContent)
    setIsOpen(false)
  }
  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="project_select_container">
      <span className="project_select_title" onClick={handleOnClick}>
        {selectedСompany}
      </span>

      {isOpen && (
        <ul className="project_select_menu">
          <Scrollbar>
            {menuList.map(item => (
              <li key={item.id}>
                <Link
                  to={`/timereport/?id=${item.id}`}
                  onClick={handleSelectedItem}
                >
                  {item.companyName}
                </Link>
              </li>
            ))}
          </Scrollbar>
        </ul>
      )}
    </div>
  )
}

export default ProjectSelect
