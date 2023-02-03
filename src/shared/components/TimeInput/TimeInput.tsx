import type { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { TextField } from '@mui/material';
import InputMask, { type Props as InputMaskProps } from 'react-input-mask';
import type { RefCallBack } from 'react-hook-form';

interface Props {
  placeholder: string;
  maskChar: string;
  mask: string;
  value: string | number;
  onFocus?: (event?: FocusEventHandler<HTMLInputElement>) => void;
  onBlur?: (event?: FocusEventHandler<HTMLInputElement>) => void;
  onChange?: (event?: ChangeEventHandler<HTMLInputElement>) => void;

  ref?: RefCallBack;

  error: boolean;
}

export const TimeInput: FC<Props & InputMaskProps> = ({
  placeholder,
  mask,
  maskChar,
  value,
  onBlur,
  onChange,
  onFocus,
  error,
  ...props
}): JSX.Element => (
  <InputMask
    placeholder={placeholder}
    maskChar={maskChar}
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
