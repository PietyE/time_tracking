import { type FC } from 'react';
import { Button } from '@mui/material';
import { MemoizedPageHeader } from 'shared/components/PageHeader';
import { GoogleDrive } from 'shared/components/svg/GoogleDrive';
import { useAppDispatch } from 'hooks/redux';
import { syncWithGoogleSheetsCreateRedirectUrl } from 'redux/asyncActions/syncWithGoogleSheets';
import { styles } from './styles';

export const ProjectReportHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClickToGoogleOAuthUrl = (): void => {
    void dispatch(syncWithGoogleSheetsCreateRedirectUrl());
  };

  return (
    <MemoizedPageHeader title='Project Report'>
      <Button
        variant='outlined'
        startIcon={<GoogleDrive />}
        type='button'
        onClick={handleClickToGoogleOAuthUrl}
        sx={styles}
      >
        Sync with Drive
      </Button>
    </MemoizedPageHeader>
  );
};
