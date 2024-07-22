import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const fetchUserStores = createAsyncThunk(
  'store/fetchUserStores',
  async (userID, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/store/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log("error");
      const errorMessage = error.response?.data || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUsersStore = createAsyncThunk(
  'store/fetchUsersStore',
  async (storeID, { getState, rejectWithValue }) => {
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/store/users/${storeID}`, {
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


export const createStore = createAsyncThunk(
  'store/createStore',
  async (storeData, { getState, rejectWithValue }) => {
    const { storeOwnerID } = storeData.storeOwner;
    const token = getState().auth.token; 
    try {
      console.log("trying to to call api");
      const response = await api.post(`/store/create/${storeOwnerID}`, storeData, {
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

export const updateUserStore = createAsyncThunk(
  'store/updateUserStore',
  async (storeData, { getState, rejectWithValue }) => {
    const { storeID, ...updateData } = storeData;
    const token = getState().auth.token; 
    try {
      
      const response = await api.put(`/store/updateUsersStore/${storeID}`, updateData, {
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
    const { storeID, userID } = storeData;
    console.log('to get token');
    const token = getState().auth.token; 
    try {
      
      const response = await api.put(`/store/delete/${storeID}/${userID}`, {}, {
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
