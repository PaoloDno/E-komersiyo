import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserStores = createAsyncThunk(
  'store/fetchUserStore',
  async (userID, { getState, rejectWithValue }) => {
    console.log('to get token');
    const token = getState().auth.token; 
    try {
      console.log("Fetching user's Store with ID:", userID);
      const response = await api.get(`/store/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error fetching user stores:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createStore = createAsyncThunk(
  'store/createStore',
  async (userID, { getState, rejectWithValue }) => {
    console.log('to get token');
    const token = getState().auth.token; 
    try {
      
      const response = await api.post(`/store/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error creating store:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const updateUserStore = createAsyncThunk(
  'store/updateUserStore',
  async (storeData, { getState, rejectWithValue }) => {
    console.log('to get token');
    const token = getState().auth.token; 
    try {
      
      const response = await api.put(`/store/${cred.storeID}`, storeData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error fetching user store:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



export const requestDeleteUserStore = createAsyncThunk(
  'store/requestDeleteUserStore',
  async (storeData, { getState, rejectWithValue }) => {
    console.log('to get token');
    const token = getState().auth.token; 
    try {
      
      const response = await api.put(`/store/${cred.storeID}`, storeData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      console.error("Error fetching user store:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);