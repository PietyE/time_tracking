import { type FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { createStyles } from '../../styles';
import { WorkItemsPermissions } from 'constants/permissions';
import { useAppShallowSelector } from 'hooks/redux';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';

export const TimeReportWorkItemsListItemButton: FC = (): JSX.Element => {
  const {
    formState: { errors, isDirty },
  } = useFormContext();
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);

  const isDisabledButton: boolean =
    !isDirty || !!errors.title?.message || !!errors.duraion?.message;

  return (
    <>
      {permissions?.includes(WorkItemsPermissions.work_items_add_workitem) && (
        <IconButton
          type='submit'
          sx={createStyles(isDisabledButton).button}
        >
          <CheckIcon />
        </IconButton>
      )}
    </>
  );
};
