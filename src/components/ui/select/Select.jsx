import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Highlighter from 'react-highlight-words'

import './style.scss'

function Select({
  extraClassContainer = '',
  listItems = [],
  title = '',
  onSelected,
  valueKey,
  idKey,
  initialChoice = null,
  onClear,
  isSearch = false,
}) {
  const [_title, setTitle] = useState(title)
  const [isOpen, setIsOpen] = useState(false)
  const [classNameOpen, setClassNameOpen] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handlerClickOpen = e => {
    if (isOpen) {
      setClassNameOpen('select_close')
      return
    }
    setIsOpen(true)
  }

  const handlerClickClear = e => {
    e.preventDefault()
    e.stopPropagation()
    setTitle(title)
    onClear()
  }

  const handlerAnimationEnd = () => {
    if (classNameOpen) {
      setClassNameOpen('')
      setIsOpen(false)
    }
  }
  const handlerClickItem = e => {
    e.preventDefault()
    setTitle(e.currentTarget.dataset.value)
  }

  const handlerChangeSearchValue = e => {
    setSearchValue(e.target.value)
  }

  const callbackEventListener = useCallback(e => {
    if (e.target.classList.contains('select_clear_btn')) {
      return
    }
    setSearchValue('')
    setClassNameOpen('select_close')
    document.removeEventListener('click', callbackEventListener)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', callbackEventListener)
    }
  }, [isOpen, callbackEventListener])

  useEffect(() => {
    if (initialChoice && initialChoice[valueKey]) {
      setTitle(initialChoice[valueKey])
    }
  }, [initialChoice])

  const classNameContainerOpen = isOpen && !classNameOpen ? 'active' : ''

  const searchedListItems = listItems.filter(item => {
    if (item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
      return true
    }
    return false
  })

  return (
    <div
      className={`select_container ${extraClassContainer} ${classNameContainerOpen}`}
      onClick={handlerClickOpen}
    >
      <div className="select_title_container">
        {isSearch && isOpen ? (
          <input
            className="select_title_text select_title_text_input"
            placeholder={_title}
            autoFocus
            onChange={handlerChangeSearchValue}
            value={searchValue}
          />
        ) : (
          <span className="select_title_text">{_title}</span>
        )}
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
          {searchedListItems.map(item => (
            <div className="select_list_item_container" key={item[idKey]}>
              <span
                className={
                  item.name === _title
                    ? 'select_list_item choise'
                    : 'select_list_item'
                }
                data-value={item[valueKey]}
                onClick={e => {
                  if (_title !== e.currentTarget.dataset.value) {
                    handlerClickItem(e)
                    onSelected(item)
                  }
                }}
              >
                {isSearch ? (
                  <Highlighter
                    highlightClassName="highlight"
                    searchWords={[searchValue]}
                    autoEscape={true}
                    textToHighlight={item[valueKey]}
                  />
                ) : (
                  item[valueKey]
                )}
              </span>
              {item.name === _title && onClear && (
                <button
                  className="select_clear_btn"
                  onClick={handlerClickClear}
                ></button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
