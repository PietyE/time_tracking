import React from 'react';
import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from '@mui/base/AutocompleteUnstyled/useAutocomplete';

type OnChange<T extends string = string> = (
  event: React.SyntheticEvent,
  value: AutocompleteValue<T, boolean, boolean, boolean>,
  reason?: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<T>,
) => void;

type Value<T extends string = string> = AutocompleteValue<
  T,
  boolean,
  boolean,
  boolean
>;

export interface NecessaryProps {
  onChange: OnChange;
  value: Value;
}
