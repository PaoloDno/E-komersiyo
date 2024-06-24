import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const fetchUser = createAsyncThunk('profile/fetchUser', async (userId) => {
  const response = await axios.get(`/api/profile/${userId}`);
  return response.data;
});

export const profileUpdate = createAsyncThunk('profile/updateUserProfile', async(postForm, thunkAPI) => {
  try {

  } catch {

  }
})

export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (profileData) => {
  const response = await axios.put(`/api/users/${profileData.userId}`, profileData);
  return response.data;
});