import { createSlice, isAllOf, type PayloadAction } from '@reduxjs/toolkit';
import {
  syncWithGoogleSheets,
  syncWithGoogleSheetsCreateToken,
} from '../asyncActions/syncWithGoogleSheets';

interface InitialState {
  isLoading: boolean;
  isOpenErrorList: boolean;
  users: {
    in_db: string[];
    in_sheet: string[];
  };
}

const initialState: InitialState = {
  isLoading: false,
  isOpenErrorList: false,
  users: {
    in_db: [],
    in_sheet: [],
  },
};

interface GoogleSyncError {
  users: {
    in_db: string[];
    in_sheet: string[];
  };
  otherError: string;
}

export interface DifferenceNamesError extends GoogleSyncError {
  users: {
    in_db: string[];
    in_sheet: string[];
  };
}

interface OtherError extends GoogleSyncError {
  otherError: string;
}

const isDifferenceInDbError = (
  action: PayloadAction<GoogleSyncError>,
): action is PayloadAction<DifferenceNamesError> => !!action.payload;

const isOtherError = (
  action: PayloadAction<OtherError>,
): action is PayloadAction<OtherError> =>
  typeof action.payload.otherError === 'string';

const syncWithGoogleSheetsSlice = createSlice({
  name: 'syncWithGoogleSheetsSlice',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenErrorList = !state.isOpenErrorList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncWithGoogleSheetsCreateToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(syncWithGoogleSheetsCreateToken.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(syncWithGoogleSheetsCreateToken.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(syncWithGoogleSheets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(syncWithGoogleSheets.fulfilled, (state) => {
      state.isLoading = false;
      state.users = initialState.users;
    });
    builder.addMatcher(
      isAllOf(syncWithGoogleSheets.rejected, isDifferenceInDbError),
      (state, action) => {
        state.users = { ...state.users, ...action.payload };
        state.isLoading = false;
      },
    );
    builder.addMatcher(
      isAllOf(syncWithGoogleSheets.rejected, isOtherError),
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export const { toggleModal } = syncWithGoogleSheetsSlice.actions;

export default syncWithGoogleSheetsSlice.reducer;
