import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const createProduct = createAsyncThunk(
  'product/createProduct',
  
  async (productData, {getState, rejectWithValue}) => {
    const {Store} = productData;
    const {storeID} = Store;
    const token = getState().auth.token; 
    try {
      const response = await api.post(`/product/create/${storeID}`, productData, {
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

export const updateProduct = createAsyncThunk(
  'product/updateProduct',

  async (productData, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      const response = await api.put(`/product/updateProduct/${productData.productID}`, productData, {
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

export const requestDeleteProduct = createAsyncThunk(
  'product/requestDeleteProduct',

  async (productData, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      const response = await api.put(`/product/requestDeleteProduct/${productData.productID}`, productData, {
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

export const getProductList = createAsyncThunk(
  'product/getProductList',
  async (userID, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/product/getProductList/${userID}`, {
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