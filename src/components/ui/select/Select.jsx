import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

function Select({
  extraClassContainer = '',
  listItems = [],
  title = '',
  onSelected,
  valueKey,
}) {
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
    const value = e.target.dataset.value
    const id = e.target.dataset.id
    setTitle(value)
    onSelected({ developer_project_id: id })
  }

  const callbackEventListener = useCallback(() => {
    setClassNameOpen('select_close')
    document.removeEventListener('click', callbackEventListener)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', callbackEventListener)
    }
  }, [isOpen, callbackEventListener])

  console.log('listItems', listItems)

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
              key={item['id']}
              className="select_list_item"
              data-value={item[valueKey]}
              data-id={item['developer_project_id']}
              onClick={handlerClickItem}
            >
              {item[valueKey]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
