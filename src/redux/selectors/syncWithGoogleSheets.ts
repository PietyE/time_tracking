import { createTypedSelector } from '../utils';
import type { DifferenceNamesError } from '../slices/syncWithGoogleSheets';

export const getSyncWithWithGoogleSheetsIsOpenErrorList =
  createTypedSelector<boolean>(
    (state) => state.syncWithGoogleSheets.isOpenErrorList,
  );

export const getSyncWithWithGoogleSheetsIsLoading =
  createTypedSelector<boolean>((state) => state.syncWithGoogleSheets.isLoading);

export const getSyncWithWithGoogleSheetsUsers = createTypedSelector<
  DifferenceNamesError['users']
>((state) => state.syncWithGoogleSheets.users);
