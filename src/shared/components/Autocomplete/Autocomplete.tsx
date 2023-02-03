import { type FC, useState, type SyntheticEvent, useEffect } from 'react';
import { TextField, Autocomplete as MUIAutocomplete } from '@mui/material';
import get from 'lodash/get';
import { createSortingNames, isEqual } from './helpers';

interface CustomProps {
  options: object[];
  keysToName: string[];
  keysToId: string[];

  onChange: (option: object) => void;

  label?: string;
  selectAll?: boolean;
}

type Props = CustomProps & {
  renderInput?: never;
};

export const Autocomplete: FC<Props> = ({
  options,
  keysToName,
  keysToId,
  onChange,
  selectAll = true,
  label = 'Select',
}): JSX.Element => {
  const [value, setValue] = useState(options[0]);

  const handleChange = (_event: SyntheticEvent, newValue: object): void => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    onChange(options[0]);
  }, []);

  return (
    <MUIAutocomplete
      clearOnEscape
      fullWidth
      autoComplete
      autoHighlight
      disablePortal
      blurOnSelect
      disableClearable
      options={options}
      isOptionEqualToValue={(option, value) => isEqual(option, value, keysToId)}
      getOptionLabel={(users) => get(users, keysToName)}
      filterOptions={(options, state) =>
        createSortingNames(options, state, keysToName, selectAll)
      }
      onChange={handleChange}
      value={value || options[0]}
      renderInput={(params) => (
        // @ts-expect-error
        <TextField
          {...params}
          label={label}
          InputProps={{ ...params.InputProps }}
          variant='outlined'
          sx={{
            '& .MuiInputBase-root': {
              py: 0,
              '& input': {
                cursor: 'pointer',
              },
            },
          }}
        />
      )}
    />
  );
};
