import { type FC } from 'react';
import { Button } from '@mui/material';
import { MemoizedPageHeader } from 'shared/components/PageHeader';
import { GoogleDrive } from 'shared/components/svg/GoogleDrive';
import { useAppDispatch, useAppShallowSelector } from 'hooks/redux';
import { syncWithGoogleSheetsCreateRedirectUrl } from 'redux/asyncActions/syncWithGoogleSheets';
import { getProfilePermissionsSelector } from 'redux/selectors/profile';
import {
  SyncWithGoogleSheetsPermissions,
  UsersPermissions,
} from 'constants/permissions';
import { styles } from './styles';

export const ProjectReportHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const permissions = useAppShallowSelector(getProfilePermissionsSelector);
  const canUseGoogleSync =
    permissions?.includes(
      SyncWithGoogleSheetsPermissions.gsheets_add_accesscredentials,
    ) && permissions?.includes(UsersPermissions.users_add_user);
  const isHaveAccess = permissions?.includes(
    SyncWithGoogleSheetsPermissions.users_can_view_syncdrive,
  );

  const handleClickToGoogleOAuthUrl = (): void => {
    void dispatch(syncWithGoogleSheetsCreateRedirectUrl());
  };

  return (
    <MemoizedPageHeader title='Project Report'>
      {isHaveAccess && (
        <Button
          variant='outlined'
          startIcon={<GoogleDrive />}
          type='button'
          disabled={!canUseGoogleSync}
          onClick={handleClickToGoogleOAuthUrl}
          sx={styles}
        >
          Sync with Drive
        </Button>
      )}
    </MemoizedPageHeader>
  );
};
