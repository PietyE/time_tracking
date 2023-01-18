import { createAsyncThunk } from '@reduxjs/toolkit';

import api from 'api';

import { lsApi, type ProfileDataStorageI } from 'services/storageApi';
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
      rejectWithValue('Something went wrong... Try again');
    }
  },
);

export const userGoogleSignIn = createAsyncThunk<User, GoogleAuthToken>(
  'profile/userGoogleSignIn',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.users.googleAuth(body);

      const userData: ProfileDataStorageI = {
        key: data.token.key,
        userId: data.token.user,
        expiration_timestamp: Number(data.token.expiration_timestamp),
        date_create: data.token.date_create,
      };

      api.setToken(data.token.key);
      lsApi.set('profileData', userData);

      return data.user;
    } catch (error) {
      return rejectWithValue('error google sign in');
    }
  },
);

export const getUserProfile = createAsyncThunk<User>(
  'profile/getUserProfile',
  async (__, { rejectWithValue }) => {
    try {
      const profileData = lsApi.get<ProfileDataStorageI>('profileData');

      if (profileData?.key && profileData.userId) {
        api.setToken(profileData.key);
        const { data } = await api.users.getUsersById(profileData.userId);
        return data;
      } else return rejectWithValue('token not found');
    } catch (error) {
      /// to do
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
      return rejectWithValue('error log in');
    }
  },
);

export const logout = createAsyncThunk('profile/logout', () => {
  lsApi.removeItem('profileData');
  api.setToken(null);
  void api.users.logout();
});
