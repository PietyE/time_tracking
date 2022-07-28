import React from 'react'
import { TextField } from '@material-ui/core'
import { ReactComponent as Search } from 'images/search-icon.svg'
import './SearchField.scss'

export const SearchField = ({ placeholder, endIcon }) => (
  <TextField
    type="search"
    variant="outlined"
    placeholder={placeholder}
    className="search-field"
    InputProps={{
      startAdornment: <Search style={{ marginRight: '10px' }} />,
      endAdornment: endIcon,
    }}
  />
)
