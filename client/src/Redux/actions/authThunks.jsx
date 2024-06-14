import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../features/api';

// Thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for registering
export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post('/register', { username, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Thunk for logging out
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});