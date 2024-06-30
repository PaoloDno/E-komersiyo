import { createSlice } from "@reduxjs/toolkit";
import {fetchUserProfile, updateUserProfile} from "../actions/profileThunk"
const initialState = {
  profileId: '',
  username: '',
  userId: '',
  userProfile: {
    firstname: '',
    lastname: '',
    middleInitial: ''
  },
  phoneNum: '',
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
  userHistory: '',
  isLoading: false,
  error: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
})

export default profileSlice.reducer;