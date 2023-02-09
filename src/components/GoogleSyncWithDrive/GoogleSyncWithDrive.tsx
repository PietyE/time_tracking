import { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { GoogleSyncWithDriveForm } from './components/GoogleSyncWithDriveForm';
import { GoogleSyncWithDriveModal } from './components/GoogleSyncWithDriveModal';
import { useGoogleDriveSync } from './helpers';
import { getSyncWithWithGoogleSheetsIsLoading } from 'redux/selectors/syncWithGoogleSheets';
import { useScrollLock } from 'hooks/useScrollLock';
import Loading from 'shared/components/Loading';
import { AppRoutes } from 'constants/appRoutesConstants';
import { useAppSelector } from 'hooks/redux';
import { MemoizedPageHeader } from 'shared/components/PageHeader';
import { googleSyncWithDriveSchema } from 'shared/validationSchema';

export interface Fields {
  googleSheetLink: string;
}

export const GoogleSyncWithDrive: FC = (): JSX.Element => {
  const { state } = useGoogleDriveSync();
  const methods = useForm<Fields>({
    mode: 'onChange',
    resolver: yupResolver(googleSyncWithDriveSchema),
  });

  if (!state)
    return (
      <Navigate
        to={`/${AppRoutes.projectReport}`}
        replace
      />
    );

  return (
    <>
      <MemoizedPageHeader title='Project report' />
      <GoogleSyncLoader />
      <FormProvider {...methods}>
        <GoogleSyncWithDriveForm />
        <GoogleSyncWithDriveModal />
      </FormProvider>
    </>
  );
};

const GoogleSyncLoader = (): JSX.Element => {
  const isLoading = useAppSelector(getSyncWithWithGoogleSheetsIsLoading);
  useScrollLock(isLoading);

  return <>{isLoading && <Loading />}</>;
};
