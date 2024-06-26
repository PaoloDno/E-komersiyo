import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  username: '',
  userProfile: {
    firstname: '',
    lastname: '',
    middleInitial: ''
  },
  phoneNum: '',
  userID: '',
  address: {
    street: '',
    bgry: '',
    city: '',
    country: '',
    postal: ''
  },
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