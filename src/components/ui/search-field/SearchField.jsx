import React from 'react'
import { TextField } from '@material-ui/core'
import { ReactComponent as Search } from 'images/search-icon.svg'
import './SearchField.scss'

export const SearchField = (props) => {
  const { type, placeholder, endIcon, value, onChange } = props
  return (
    <TextField
      type={type}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      className="search-field"
      InputProps={{
        startAdornment: <Search style={{ marginRight: '10px' }} />,
        endAdornment: endIcon,
      }}
      onChange={onChange}
    />
  )
}
