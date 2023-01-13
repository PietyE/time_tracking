import React, { useState } from 'react';
import {
  Autocomplete as MUIAutocomplete,
  type AutocompleteProps as MUIAutocompleteProps,
} from '@mui/material';
import { createSorting } from './helpers';
import type { NecessaryProps } from '../../types';

type Props<T extends string = string> = MUIAutocompleteProps<
  T,
  boolean,
  boolean,
  boolean
> &
  NecessaryProps;

export const Autocomplete: React.FC<Props> = ({
  options,
  value,
  onChange,
  noOptionsText,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string | null>(() => options[0]);
  const handleChange = (
    __: React.SyntheticEvent,
    newValue: string | null,
  ): void => {
    setInputValue(newValue);
  };
  // todo: fix
  const defaultValue =
    inputValue === '1' ? 'Select all' : inputValue ?? 'Choose';

  return (
    <MUIAutocomplete
      options={options}
      value={value}
      onChange={onChange}
      fullWidth
      autoComplete
      autoHighlight
      disablePortal
      blurOnSelect
      disableClearable
      inputValue={defaultValue}
      onInputChange={handleChange}
      filterOptions={createSorting}
      clearOnEscape
      noOptionsText={noOptionsText}
      {...props}
    />
  );
};
