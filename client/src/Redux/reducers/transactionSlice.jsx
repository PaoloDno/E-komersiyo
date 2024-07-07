// src/slices/transactionSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: () => {
  }
});

export default transactionSlice.reducer;
