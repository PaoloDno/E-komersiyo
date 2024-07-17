import { createSlice } from "@reduxjs/toolkit";
import { fetchUserStores, fetchUsersStore, createStore, updateUserStore, requestDeleteUserStore } from "../actions/storeThunks";

const initialState = {
  stores: [],
  store: {},
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
      .addCase(fetchUserStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchUserStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.store = action.payload;
      })
      .addCase(fetchUsersStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.store = action.payload;
      })
      .addCase(createStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.store = action.payload;
      })
      .addCase(updateUserStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestDeleteUserStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestDeleteUserStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = state.stores.filter(store => store._id !== action.payload);
      })
      .addCase(requestDeleteUserStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default storeSlice.reducer;
