import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Highlighter from 'react-highlight-words'
import _ from 'lodash'

import { usePrevious } from 'custom-hook/usePrevious'

import './style.scss'

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
  const [isOpen, setIsOpen] = useState(false)
  const [classNameOpen, setClassNameOpen] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const prevList = usePrevious(listItems)

  const handlerClickOpen = (e) => {
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

  const handlerClickItem = (e) => {
    e.preventDefault()
    setTitle(e.currentTarget.dataset.value)
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
  }, [isOpen, callbackEventListener])

  // useEffect(() => {
  //   if (initialChoice && initialChoice[valueKey]) {
  //     setTitle(initialChoice[valueKey])
  //   }
  // }, [initialChoice])

  useEffect(()=>{
    if (initialChoice && initialChoice[valueKey]){
      setTitle(initialChoice[valueKey])
    } else if(!initialChoice && listItems?.length){
      setTitle(title)
    }
  },[listItems,initialChoice])
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
  }, [listItems])

  const classNameContainerOpen = isOpen && !classNameOpen ? 'active' : ''

  const classNameDisabled = !listItems.length ? 'disabled' : ''

  const searchedListItems = listItems.filter((item) => {
    if (item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) {
      return true
    }
    return false
  })

  return (
    <button
      className={`select_container ${extraClassContainer} ${classNameContainerOpen} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={disabled ? null : handlerClickOpen}
      tabIndex={1}
      //disabled={!listItems.length}
    >
      <div className="select_title_container">
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
          icon={faCaretDown}
          className={
            isOpen && !classNameOpen
              ? 'select_title_icon active'
              : 'select_title_icon'
          }
        />
      </div>
      {isOpen && !disabled && (
        <div
          className={`select_list_container ${classNameOpen}`}
          onAnimationEnd={handlerAnimationEnd}
        >
          {searchedListItems.map((item) => (
            <div className="select_list_item_container" key={item[idKey]}>
              <span
                className={
                  item.name === _title
                    ? 'select_list_item choise'
                    : 'select_list_item'
                }
                data-value={item[valueKey]}
                onClick={(e) => {
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
