import { createSlice } from "@reduxjs/toolkit";
import { fetchUserStores, createStore, updateUserStore, requestDeleteUserStore  } from "../actions/storeThunks";

const initialState = {
  stores: [],
  store: null,
  isLoading: false,
  error: null
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStores.fulfilled, (state) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchUserStores.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(createStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state) => {
        state.isLoading = false;
        state.store = action.payload;
      })
      .addCase(createStore.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase()


  }
})

export default storeSlice.reducer;