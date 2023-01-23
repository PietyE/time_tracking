import type { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { TextField } from '@mui/material';
import InputMask, { type Props as InputMaskProps } from 'react-input-mask';

interface Props {
  placeholder: string;
  maskPlaceholder: string;
  mask: string;
  value: string | number;
  onFocus?: (event?: FocusEventHandler<HTMLInputElement>) => void;
  onBlur?: (event?: FocusEventHandler<HTMLInputElement>) => void;
  onChange?: (event?: ChangeEventHandler<HTMLInputElement>) => void;

  error: boolean;
}

export const TimeInput: FC<Props & InputMaskProps> = ({
  placeholder,
  mask,
  maskPlaceholder,
  value,
  onBlur,
  onChange,
  onFocus,
  error,
  ...props
}): JSX.Element => (
  <InputMask
    placeholder={placeholder}
    maskPlaceholder={maskPlaceholder}
    value={value}
    onChange={onChange}
    mask={mask}
    onFocus={onFocus}
    onBlur={onBlur}
    {...props}
  >
    {/* @ts-expect-error */}
    {(inputProps) => (
      <TextField
        variant='outlined'
        fullWidth
        inputProps={{ sx: { textAlign: 'center' } }}
        error={error}
        {...inputProps}
      />
    )}
  </InputMask>
);
