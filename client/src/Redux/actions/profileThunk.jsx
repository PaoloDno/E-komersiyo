import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userID, thunkAPI) => {
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/profile/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
          }
        });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, thunkAPI) => {
    try {
      const response = await api.put(`/users/${profileData.userID}/profile`, profileData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
