import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  getUserProfile,
  loginWithCredentials,
  logout,
  userGoogleSignIn,
} from '../asyncActions/profile';
import { Role } from 'constants/profileRoleConstants';
import type { User } from 'api/models/users';

export interface IProfile {
  isAuth: boolean;
  isLoading: boolean;
  isProfileFetching: boolean;
  profileData: User & { imageUrl?: string }; // refactor to do
}

const initialState: IProfile = {
  isAuth: false,
  isLoading: true,
  isProfileFetching: false,
  profileData: {
    id: '',
    name: '',
    email: '',
    role: Role.developer,
    permissions: [],
    is_active: false,
    position: '',
    imageUrl: '',
    date_of_birth: '',
    phone: '',
    slack: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userGoogleSignIn.pending, (state) => {
      state.isProfileFetching = true;
    });
    builder.addCase(
      userGoogleSignIn.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isProfileFetching = false;
        state.isAuth = true;
        state.profileData = action.payload;
      },
    );
    builder.addCase(userGoogleSignIn.rejected, (state) => {
      state.isProfileFetching = false;
      state.isAuth = false;
    });
    builder.addCase(
      getUserProfile.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.profileData = action.payload;
      },
    );
    builder.addCase(getUserProfile.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.profileData = initialState.profileData;
    });
    builder.addCase(loginWithCredentials.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginWithCredentials.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isProfileFetching = false;
        state.isAuth = true;
        state.profileData = action.payload;
      },
    );
    builder.addCase(loginWithCredentials.rejected, (state) => {
      state.isProfileFetching = false;
      state.isAuth = false;
    });
  },
});

export default profileSlice.reducer;
