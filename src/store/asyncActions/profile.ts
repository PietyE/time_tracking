import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "api";

import type { GoogleAuthData } from "api/models/users";
import { lsApi, type ProfileDataStorageI } from "services/storageApi";

export const userGoogleSignIn = createAsyncThunk(
  "profile/userGoogleSignIn",
  async (body: GoogleAuthData, { rejectWithValue }) => {
    try {
      const { data } = await api.users.googleAuth(body);

      const userData: ProfileDataStorageI = {
        key: data.token.key,
        userId: data.token.user,
      };

      api.setToken(data.token.key);
      lsApi.set("profileData", userData);

      return data.user;
    } catch (error) {
      return rejectWithValue("error google sign in");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const profileData = lsApi.get<ProfileDataStorageI>("profileData");

      if (profileData?.key && profileData.userId) {
        api.setToken(profileData.key);
        const { data } = await api.users.getUsersById(profileData.userId);
        return data;
      } else return rejectWithValue("token not found");
    } catch (error) {
      /// to do
      return rejectWithValue("error get profile");
    }
  }
);

export const logout = createAsyncThunk("profile/logout", () => {
  lsApi.removeItem("profileData");
  api.setToken(null);
  api.users.logout();
});
