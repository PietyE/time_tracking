import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import { toggleModal } from '../slices/syncWithGoogleSheets';
import api from 'api';
import type { SyncWithGoogleSheetsData } from 'api/models/userHours';
import type { RootState } from '../store';

export const syncWithGoogleSheetsCreateRedirectUrl = createAsyncThunk(
  'syncWithGoogleSheets/syncWithGoogleSheetsCreateRedirectUrl',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.userHours.getAuthUrl();
      if (data?.google_auth_url) window.location.href = data?.google_auth_url;
      else
        throw new Error('You can not be redirect to google login. Try later.');
    } catch (error) {
      toast.error(
        (error as Error).message || 'Something went wrong... Try again',
      );
      rejectWithValue('Something went wrong... Try again');
    }
  },
);

export const syncWithGoogleSheetsCreateToken = createAsyncThunk<
  unknown,
  GoogleAuthCallbackUrlData
>(
  'syncWithGoogleSheets/syncWithGoogleSheetsCreateToken',
  async (data, { rejectWithValue }) => {
    try {
      await api.userHours.createToken(data);
    } catch (error) {
      toast.error((error as AxiosError)?.message || 'Access denied');
      return rejectWithValue('Access denied');
    }
  },
);

export const syncWithGoogleSheets = createAsyncThunk<
  unknown,
  SyncWithGoogleSheetsData
>(
  'syncWithGoogleSheets/syncWithGoogleSheets',
  async (data, { rejectWithValue, getState, dispatch }) => {
    try {
      const { calendar } = getState() as RootState;
      const { data: users } = await api.userHours.syncWithGoogleSheets({
        ...data,
        month: calendar.month + 1,
        year: calendar.year,
      });

      // users.error it`s a field throwing from BE if we have difference in names
      if (!isEmpty(users?.errors)) {
        dispatch(toggleModal());
        toast.warning('You have difference in database and google sheet');
        return rejectWithValue(users?.errors);
      }

      // non field error its BE error throwing for checking if we have empty name in google sheet
      if (!isEmpty(users?.non_field_errors)) {
        toast.warning('Check google sheet for an empty fields');
        return rejectWithValue('Check google sheet for an empty fields');
      }
      toast.success('Successfully synced with Google Drive');
    } catch (error) {
      toast.error((error as AxiosError)?.message || 'Something went wrong');
      return rejectWithValue('Something went wrong');
    }
  },
);
