import React from 'react'
import { Autocomplete as MUIAutocomplete } from '@material-ui/lab'
import { InputAdornment, TextField } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'

export const Autocomplete = ({
  options,
  value,
  onChange,
  placeholder,
  startIcon,
  ...rest
}) => {
  const selectOptionHandler = (event, newValue) => {
    onChange(newValue)
  }

  return (
    <MUIAutocomplete
      options={options}
      value={value}
      onChange={selectOptionHandler}
      popupIcon={<ExpandMoreIcon />}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ),
          }}
        />
      )}
      closeIcon=""
      blurOnSelect
      autoHighlight
      {...rest}
    />
  )
}

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  startIcon: PropTypes.node.isRequired,
}
