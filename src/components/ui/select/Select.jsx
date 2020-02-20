import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

function Select({ extraClassContainer = '', listItems = [], title = '' }) {
  const [_title, setTitle] = useState(title)
  const [isOpen, setIsOpen] = useState(false)
  const [classNameOpen, setClassNameOpen] = useState('')

  const handlerClickOpen = e => {
    if (isOpen) {
      setClassNameOpen('select_close')
      return
    }
    setIsOpen(true)
  }
  const handlerAnimationEnd = () => {
    if (classNameOpen) {
      setClassNameOpen('')
      setIsOpen(false)
    }
  }
  const handlerClickItem = e => {
    e.preventDefault()
    const name = e.target.dataset.name
    setTitle(name)
  }
  return (
    <div
      className={`select_container ${extraClassContainer}`}
      onClick={handlerClickOpen}
    >
      <div className="select_title_container">
        <span className="select_title_text">{_title}</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={
            isOpen && !classNameOpen
              ? 'select_title_icon active'
              : 'select_title_icon'
          }
        />
      </div>
      {isOpen && (
        <div
          className={`select_list_container ${classNameOpen}`}
          onAnimationEnd={handlerAnimationEnd}
        >
          {listItems.map(item => (
            <span
              key={item}
              className="select_list_item"
              data-name={item}
              onClick={handlerClickItem}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
