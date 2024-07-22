import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userID, { getState, rejectWithValue }) => {
    
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/profile/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    try {
      const response = await api.put(`/profile/update/${profileData.userID}`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddressProfile = createAsyncThunk(
  'profile/fetchAddressProfile',
  async (userID, { getState, rejectWithValue }) => {
    console.log('to get token for address');
    const token = getState().auth.token; 
    try {
      console.log("Fetching user address profile with ID:", userID);
      const response = await api.get(`/profile/address/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error fetching user address profile:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateAddressProfile = createAsyncThunk(
  'profile/updateAddressProfile',
  async (addressData, { getState, rejectWithValue }) => {
    console.log('to get token for address');
    const token = getState().auth.token; 
    try {
      console.log("Fetching user address profile with ID:", addressData.userID);
      const response = await api.put(`/profile/updateAddress/${addressData.userID}`, addressData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error fetching user address profile:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);




