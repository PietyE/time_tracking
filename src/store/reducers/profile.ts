import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "constants/profileRoleConstants";
import { createTypedSelector } from "../utils";
import { User } from "api/models/users";

import {
  userGoogleSignIn,
  getUserProfile,
  logout,
} from "../asyncActions/profile";

interface IProfile {
  isAuth: boolean;
  isLoading: boolean;
  isProfileFetching: boolean;
  profileData: User & { imageUrl?: string }; //// refactor to do
}

const initialState: IProfile = {
  isAuth: false,
  isLoading: true,
  isProfileFetching: false,
  profileData: {
    id: "",
    name: "",
    email: "",
    role: Role.developer,
    permissions: [],
    is_active: false,
    position: "",
    imageUrl: "",
    date_of_birth: "",
    phone: "",
    slack: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    [userGoogleSignIn.pending.type]: (state) => {
      state.isProfileFetching = true;
    },
    [userGoogleSignIn.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isProfileFetching = false;
      state.isAuth = true;
      state.profileData = action.payload;
    },
    [userGoogleSignIn.rejected.type]: (state) => {
      state.isProfileFetching = false;
      state.isAuth = false;
    },
    [getUserProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuth = true;
      state.profileData = action.payload;
    },
    [getUserProfile.rejected.type]: (state) => {
      state.isLoading = false;
      state.isAuth = false;
    },
    [logout.fulfilled.type]: (state) => {
      state.isAuth = false;
      state.profileData = initialState.profileData;
    },
  },
});

export const getIsAuthProfileSelector = createTypedSelector(
  (state) => state.profile.isAuth
);

export const getProfileRoleSelector = createTypedSelector(
  (state) => state.profile.profileData.role
);

export const getIsLoadingProfileSelector = createTypedSelector(
  (state) => state.profile.isLoading
);

export const getProfilePermissionsSelector = createTypedSelector(
    (state) => state.profile.profileData.permissions
)

export default profileSlice.reducer;
