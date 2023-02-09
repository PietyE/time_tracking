import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/redux';
import { syncWithGoogleSheetsCreateToken } from 'redux/asyncActions/syncWithGoogleSheets';

interface ReturnType {
  state: string | null;
}

export const useGoogleDriveSync = (): ReturnType => {
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      void dispatch(
        syncWithGoogleSheetsCreateToken({
          state,
          callback_url: window.location.href,
        }),
      );
    }
  }, [dispatch, state]);

  return { state };
};
