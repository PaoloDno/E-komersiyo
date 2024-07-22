import { createSlice } from "@reduxjs/toolkit";
import { createProduct, updateProduct, requestDeleteProduct, getProductList } from "../actions/productThunks";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  error: null
}


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(requestDeleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(requestDeleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase(requestDeleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(getProductList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getProductList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase(getProductList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }
})

export default productSlice.reducer;