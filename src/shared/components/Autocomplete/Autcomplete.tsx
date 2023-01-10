import React from 'react';
import {
  Autocomplete as MUIAutocomplete,
  type AutocompleteProps as MUIAutocompleteProps,
} from '@mui/material';
import type { NecessaryProps } from './types';

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
}) => (
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
    {...props}
  />
);
