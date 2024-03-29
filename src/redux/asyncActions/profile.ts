import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from 'api';
import { lsApi, type ProfileDataStorageI } from 'services/storageApi';
import type { AxiosError } from 'axios';
import type { UserLoginData, User } from 'api/models/users';

export const userGoogleSingInGetRedirectUrl = createAsyncThunk(
  'profile/userGoogleSingInGetRedirectUrl',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.users.getGoogleAuthRedirectUrl();
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

export const userGoogleSignIn = createAsyncThunk<
  User,
  GoogleAuthCallbackUrlData
>('profile/userGoogleSignIn', async (data, { rejectWithValue }) => {
  try {
    api.setToken(null);
    lsApi.removeItem('profileData');
    const { data: googleToken } = await api.users.getGoogleAuthToken(data);

    const { data: profileDate } = await api.users.googleAuth(googleToken);

    const userData: ProfileDataStorageI = {
      key: profileDate.token.key,
      userId: profileDate.token.user,
      expiration_timestamp: Number(profileDate.token.expiration_timestamp),
      date_create: profileDate.token.date_create,
    };

    api.setToken(profileDate.token.key);
    lsApi.set('profileData', userData);

    return profileDate.user;
  } catch (error) {
    toast.error((error as AxiosError)?.message || 'Access denied');
    return rejectWithValue('Access denied');
  }
});

export const getUserProfile = createAsyncThunk<User>(
  'profile/getUserProfile',
  async (__, { rejectWithValue }) => {
    try {
      const profileData = lsApi.get<ProfileDataStorageI>('profileData');

      const nowTime: number = Math.floor(new Date().getTime() / 1000);

      if (
        profileData?.key &&
        profileData.userId &&
        nowTime < profileData.expiration_timestamp
      ) {
        api.setToken(profileData.key);
        const { data } = await api.users.getUsersById(profileData.userId);
        return data;
      } else {
        return rejectWithValue('error get profile');
      }
    } catch (error) {
      toast.error((error as AxiosError)?.message || 'Token not found');
      return rejectWithValue('error get profile');
    }
  },
);

export const loginWithCredentials = createAsyncThunk<User, UserLoginData>(
  'profile/loginWithCredentials',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await api.users.login(userCredentials);

      const userData: ProfileDataStorageI = {
        ...data.token,
        userId: data.token.user,
        expiration_timestamp: Number(data.token.expiration_timestamp),
      };

      api.setToken(data.token.key);
      lsApi.set('profileData', userData);

      return data.user;
    } catch (error) {
      toast.error(
        (
          (error as AxiosError)?.response?.data as {
            non_field_errors: string[];
          }
        ).non_field_errors[0] || 'Error log in',
      );
      return rejectWithValue('error log in');
    }
  },
);

export const logout = createAsyncThunk('profile/logout', async () => {
  await api.users.logout();
  lsApi.removeItem('profileData');
  api.setToken(null);
});
