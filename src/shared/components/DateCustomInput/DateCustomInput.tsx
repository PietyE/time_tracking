import { type FC, forwardRef } from 'react';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import { TextField, type TextFieldProps } from '@mui/material';
import styles from './DateCustomInput.module.scss';

export const DateCustomInput: FC<TextFieldProps> = forwardRef(
  (props, ref): JSX.Element => (
    <TextField
      inputRef={ref}
      className={styles.information_textField}
      InputProps={{
        endAdornment: <CalendarMonth sx={{ color: 'primary.contrastText' }} />,
      }}
      {...props}
    />
  ),
);

DateCustomInput.displayName = 'DateCustomInput';
