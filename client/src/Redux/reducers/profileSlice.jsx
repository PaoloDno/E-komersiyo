import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile, fetchAddressProfile, updateAddressProfile } from "../actions/profileThunk";

const initialState = {
  profile: {
    userProfile: {
      firstname: '',
      lastname: '',
      middleInitial: ''
    },
    phoneNumber: '',
    address: {
      street: '',
      bgry: '',
      city: '',
      country: '',
      postal: ''
    },
    userStores: [],
    addressID: '',
    cartID: '',
    userHistory: ''
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Profile data received:", action.payload);
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddressProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddressProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Address data received:", action.payload);
        state.profile.address = action.payload;
      })
      .addCase(fetchAddressProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateAddressProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddressProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile.address = action.payload;
      })
      .addCase(updateAddressProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default profileSlice.reducer;
