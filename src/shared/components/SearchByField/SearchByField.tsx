import { useRef, type FC, useEffect, type ChangeEvent } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import SearchIcon from 'shared/components/svg/SearchIcon';
import { styles } from './styles';

interface SearchFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface NotAllowedProps {
  fullWidth?: never;
  type?: never;
  InputProps?: never;
  inputRef?: never;
  sx?: never;
}

type Props = SearchFieldProps & TextFieldProps & NotAllowedProps;

export const SearchField: FC<Props> = ({
  type = 'text',
  placeholder = 'Search',
  value,
  onChange,
  ...props
}) => {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    ref?.current?.focus();
  });

  return (
    <TextField
      placeholder={placeholder}
      type={type}
      value={value}
      inputRef={ref}
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
      onChange={onChange}
      sx={styles}
      {...props}
    />
  );
};
