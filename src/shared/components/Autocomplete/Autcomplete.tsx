import React from 'react';
import {
  Autocomplete as MUIAutocomplete,
  type AutocompleteProps as MUIAutocompleteProps,
} from '@mui/material';
import type { NecessaryProps } from './types';

type Props<T extends {} = {}> = MUIAutocompleteProps<
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
  ...rest
}) => {
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
      noOptionsText={noOptionsText}
      {...rest}
    />
  );
};
