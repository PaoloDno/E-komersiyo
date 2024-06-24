import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {
    firstname: '',
    lastname: '',
    middleInitial: ''
  },
  phoneNum: '',
  userID: '',
  userStores: [],
  addressID: '',
  cartID: '',
  userHistory: '',
  isLoading,
  error,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  }
})

export default profileSlice.reducer;