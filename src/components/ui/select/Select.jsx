import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Highlighter from 'react-highlight-words'
import _ from 'lodash'

import { usePrevious } from 'custom-hook/usePrevious'

import './style.scss'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { sortProjectsByName } from 'utils/common'

function Select(props) {
  const {
    extraClassContainer = '',
    listItems = [],
    title = '',
    onSelected,
    valueKey,
    idKey,
    initialChoice = null,
    onClear,
    isSearch = false,
    disabled,
  } = props

  const [_title, setTitle] = useState(title)
  const [icon, setIcon] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [classNameOpen, setClassNameOpen] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const prevList = usePrevious(listItems)

  const handlerClickOpen = () => {
    if (isOpen) {
      setClassNameOpen('select_close')
      return
    }
    setIsOpen(true)
  }

  const handlerClickClear = (e) => {
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

  const handlerClickItem = (e, icon = false) => {
    e.preventDefault()
    setTitle(e.currentTarget.dataset.value)
    if (icon) {
      setIcon(icon)
    }
  }

  const handlerChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const callbackEventListener = useCallback((e) => {
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
    return () => {
      document.removeEventListener('click', callbackEventListener)
    }
  }, [isOpen, callbackEventListener])

  ///////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (initialChoice && initialChoice[valueKey]) {
  //     setTitle(initialChoice[valueKey])
  //   }
  // }, [initialChoice])
  ///////////////////////////////////////////////////////////
  useEffect(() => {
    if (initialChoice && initialChoice[valueKey]) {
      if (initialChoice.iconColor) {
        setIcon(initialChoice.iconColor)
      }
      setTitle(initialChoice[valueKey])
    } else if (!initialChoice && listItems?.length) {
      setTitle(title)
      if (initialChoice && initialChoice.iconColor) {
        setIcon(initialChoice.iconColor)
      }
    }
  }, [listItems, initialChoice, title, valueKey])

  useEffect(() => {
    if (
      prevList &&
      listItems &&
      prevList.length &&
      !_.isEqualWith(listItems, prevList, (i1, i2) => i1['id'] === i2['id'])
    ) {
      setTitle(title)
    } else if (!listItems.length) {
      setTitle('List is empty')
    }
  }, [listItems, prevList, title])

  const classNameContainerOpen = isOpen && !classNameOpen ? 'active' : ''

  const classNameDisabled = !listItems.length ? 'disabled' : ''

  const searchedListItems = listItems
    .filter(
      (item) =>
        item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    )
    .sort(sortProjectsByName)

  const showContainer = isOpen && !disabled && !!searchedListItems.length
  return (
    <button
      className={`select_container ${extraClassContainer} ${classNameContainerOpen} ${
        disabled ? 'disabled' : ''
      }`}
      type="button"
      onClick={disabled ? null : handlerClickOpen}
      tabIndex={1}
      //disabled={!listItems.length}
    >
      <div className="select_title_container">
        {icon ? (
          <span
            className={'select_circle-icon'}
            style={{ backgroundColor: icon }}
          ></span>
        ) : (
          ''
        )}
        {isSearch && isOpen && !disabled ? (
          <input
            className="select_title_text select_title_text_input"
            placeholder={_title}
            autoFocus
            onChange={handlerChangeSearchValue}
            value={searchValue}
          />
        ) : (
          <span className={`select_title_text ${classNameDisabled}`}>
            {_title}
          </span>
        )}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={
            isOpen && !classNameOpen
              ? 'select_title_icon active'
              : 'select_title_icon'
          }
        />
      </div>
      {showContainer && (
        <div
          className={`select_list_container ${classNameOpen}`}
          onAnimationEnd={handlerAnimationEnd}
        >
          {searchedListItems.map((item) => (
            <div
              className={
                'select_list_item_container  ' +
                (item.name === _title ? 'selected' : '')
              }
              key={item[idKey]}
            >
              {item.iconColor && (
                <span
                  className={'select_circle-icon'}
                  style={{ backgroundColor: item.iconColor }}
                ></span>
              )}
              {item.count && (
                <span
                  className={
                    'count-container ' +
                    (item.name === 'Active' ? 'active' : '')
                  }
                >
                  {item.count}
                </span>
              )}

              <span
                className={
                  item.name === _title
                    ? 'select_list_item choise'
                    : 'select_list_item'
                }
                data-value={item[valueKey]}
                onClick={(e) => {
                  if (_title !== e.currentTarget.dataset.value) {
                    handlerClickItem(e, item.iconColor)
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
                <span
                  className="select_clear_btn"
                  onClick={handlerClickClear}
                ></span>
              )}
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

export default Select
