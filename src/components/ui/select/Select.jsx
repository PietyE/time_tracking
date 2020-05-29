import React, { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Highlighter from 'react-highlight-words'
import _ from 'lodash'

import { usePrevious } from 'custom-hook/usePrevious'

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
  disabled,
}) {
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

  useEffect(() => {
    if (initialChoice && initialChoice[valueKey]) {
      setTitle(initialChoice[valueKey])
    }
  }, [initialChoice])

  useEffect(() => {
    if (
      prevList &&
      listItems &&
      prevList.length &&
      !_.isEqualWith(listItems, prevList, (i1, i2) => i1['id'] === i2['id'])
    ) {
      setTitle(title)
    }
  }, [listItems])

  const classNameContainerOpen = isOpen && !classNameOpen ? 'active' : ''

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
                <button
                  className="select_clear_btn"
                  onClick={handlerClickClear}
                ></button>
              )}
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

export default Select

// '[{"id":"cccd86e0-c865-4a85-90b3-1d107835449e","name":"JobCast","logo":null},{"id":"93fb5705-bb17-4245-a3d9-75fcd927e1e6","name":"Betting Service","logo":null},{"id":"1ef5df7d-9ecc-4a13-8b47-74b3bdef4073","name":"Vilmate Time Tracking","logo":"https://fra1.digitaloceanspaces.com/timetracking/dev-time-tracking/project/1ef5df7d-9ecc-4a13-8b47-74b3bdef4073/dcbcb8ca-5472-40fb-b5ba-dabc63d24d2e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=FVCVA4LVCQ4BPGA4227O%2F20200526%2Ffra1%2Fs3%2Faws4_request&X-Amz-Date=20200526T091255Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&X-Amz-Signature=18f9944342c8be893eaa92404aecae3327991fc1c749c4f375866ad9104d4308"},{"id":"a386372c-b96d-41cc-9791-702b8ec3802b","name":"HelpMed","logo":null},{"id":"559a4afd-441c-45bd-9eca-52c4494ce8a5","name":"Info De Rue","logo":null}]'

// '[{"id":"cccd86e0-c865-4a85-90b3-1d107835449e","name":"JobCast","logo":null},{"id":"93fb5705-bb17-4245-a3d9-75fcd927e1e6","name":"Betting Service","logo":null},{"id":"1ef5df7d-9ecc-4a13-8b47-74b3bdef4073","name":"Vilmate Time Tracking","logo":"https://fra1.digitaloceanspaces.com/timetracking/dev-time-tracking/project/1ef5df7d-9ecc-4a13-8b47-74b3bdef4073/dcbcb8ca-5472-40fb-b5ba-dabc63d24d2e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=FVCVA4LVCQ4BPGA4227O%2F20200526%2Ffra1%2Fs3%2Faws4_request&X-Amz-Date=20200526T091248Z&X-Amz-Expires=604799&X-Amz-SignedHeaders=host&X-Amz-Signature=c8bf38e362f3c4dba85c4a7952bf6f0d68054eb141a2c6b7f36fc0d82c6d083b"},{"id":"a386372c-b96d-41cc-9791-702b8ec3802b","name":"HelpMed","logo":null},{"id":"559a4afd-441c-45bd-9eca-52c4494ce8a5","name":"Info De Rue","logo":null}]'
