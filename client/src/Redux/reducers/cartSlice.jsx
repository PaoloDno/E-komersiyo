import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
  productName: '',
  productPrice: '',
  storeName: '',
  productDescription: '',
  productCategory: '',
  productImage: '',
  },
  isLoading: false,
  error: null
}


const productSlice = createSlice({
  name: 'product',
  initialState,
  reducer: {},
  extraReducers: () => {

  }
})

export default productSlice.reducer;