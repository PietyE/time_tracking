import { type FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { createStyles } from '../../styles';

export const TimeReportWorkItemsListItemButton: FC = (): JSX.Element => {
  const {
    formState: { errors, isDirty },
  } = useFormContext();

  const isDisabledButton: boolean =
    !isDirty || !!errors.title?.message || !!errors.duraion?.message;

  return (
    <>
      <IconButton
        type='submit'
        sx={createStyles(isDisabledButton).button}
      >
        <CheckIcon />
      </IconButton>
    </>
  );
};
