import { createSlice, isAllOf, type PayloadAction } from '@reduxjs/toolkit';
import {
  syncWithGoogleSheets,
  syncWithGoogleSheetsCreateToken,
} from '../asyncActions/syncWithGoogleSheets';

const todayDate: Date = new Date();

interface InitialState {
  isLoading: boolean;
  googleSheetLink: string;
  isOpenErrorList: boolean;
  users: {
    in_db: string[];
    in_sheet: string[];
  };
  accessError: false;
  selectedDate: {
    month: number;
    year: number;
  };
}

const initialState: InitialState = {
  isLoading: false,
  googleSheetLink: '',
  isOpenErrorList: false,
  users: {
    in_db: [],
    in_sheet: [],
  },
  accessError: false,
  selectedDate: {
    month: todayDate.getMonth(),
    year: todayDate.getFullYear(),
  },
};

interface GoogleSyncError {
  users: {
    in_db: string[];
    in_sheet: string[];
  };
  otherError: string;
}

interface DifferenceNamesError extends GoogleSyncError {
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
): action is PayloadAction<DifferenceNamesError> => !!action.payload.users;

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
    changeDate: (
      state,
      action: PayloadAction<{ month: number } | { year: number }>,
    ) => {
      state.selectedDate = { ...state.selectedDate, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncWithGoogleSheetsCreateToken.pending, (state) => {
      state.isLoading = true;
      state.accessError = false;
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

export const { toggleModal, changeDate } = syncWithGoogleSheetsSlice.actions;

export default syncWithGoogleSheetsSlice.reducer;
