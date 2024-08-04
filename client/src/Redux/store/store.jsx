import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import profileReducer from '../reducers/profileSlice';
import storesReducer from '../reducers/storeSlice';
import productReducer from '../reducers/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    stores: storesReducer,
    products: productReducer
  },
});

export default store;