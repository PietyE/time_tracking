import React, { useEffect, useState } from 'react'

function InfoItemM({
  icon,
  title,
  value,
  editValue,
  isArchived,
  customClass = '',
  placeholder = false,
  isSearching = false,
}) {
  const [isEdit, setEdit] = useState(false)

  useEffect(() => {
    setEdit(false)
  }, [value])

  const handleBlur = () => {
    if (!isSearching) {
      setEdit(false)
    }
  }

  const placeholderClassName = placeholder ? 'not-selected' : ''
  const dataInfoRowClassName = isSearching ? 'searching-field' : ''

  return (
    <>
      <div
        id="Form Control Item"
        className={`div_info_row ${customClass} ${dataInfoRowClassName}`}
        onClick={() => {
          !isArchived && setEdit(true)
        }}
        onBlur={() => {
          !isArchived && handleBlur()
        }}
      >
        <div>
          <img
            src={icon || '/static/media/calendar-userData.b7cd0c61.svg'}
            className="calendar"
            alt="calendar"
          />
          <span className="info_text">{title}</span>
        </div>
        {!isEdit || !editValue ? (
          <span
            id="Non Edit Data"
            className={`info_data ${placeholderClassName}`}
          >
            {value}
          </span>
        ) : (
          <span id="Edit Data" className="info_data info_data_focus">
            {editValue}
          </span>
        )}
      </div>
      <div className="row2 grey"></div>
    </>
  )
}

export default InfoItemM
