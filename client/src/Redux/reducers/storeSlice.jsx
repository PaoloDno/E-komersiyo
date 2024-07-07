import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: {
    storeName:'',
    storeOwner: '',
    storeDescription: '',
    storeCategory: '',
    storeImage: '',
    verified: '',
  },
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: () => {

  }
})

export default storeSlice.reducer;