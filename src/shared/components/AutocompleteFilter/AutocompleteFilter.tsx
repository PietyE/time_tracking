import { type FC } from 'react';
import { Box, TextField } from '@mui/material';
import { Autocomplete } from './components/Autocomplete';
import type { NecessaryProps } from './types';
import { styles } from './styles';

interface ProjectFilterProps {
  options: string[];

  label?: string;

  width?: number;
}

type Props = ProjectFilterProps & NecessaryProps;

export const AutocompleteFilter: FC<Props> = ({
  options,
  value,
  onChange,
  label = 'Choose',
  width = 200,
}): JSX.Element => (
  <Box width={width}>
    <Autocomplete
      options={options}
      value={value}
      renderInput={(params) => (
        // @ts-expect-error
        <TextField
          {...params}
          label={label}
          InputProps={{ ...params.InputProps }}
          variant='outlined'
        />
      )}
      onChange={onChange}
      sx={styles}
    />
  </Box>
);
