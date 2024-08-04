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

export const getProductListUser = createAsyncThunk(
  'product/getProductListUser',
  async (userID, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      const response = await api.get(`/product/getProductListUser/${userID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("hello");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  } 
);

export const getProductListStore = createAsyncThunk(
  'product/getProductListStore',
  async (storeID, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      console.log(storeID);
      const response = await api.get(`/product/getProductListStore/${storeID}`, {
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

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async(productID, {getState, rejectWithValue}) => {
    const token = getState().auth.token; 
    try {
      console.log(productID);
      const response = await api.get(`/product/getProduct/${productID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)