// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // auth slice'ı store'a ekleniyor
  },
});

// Store'u kullanmak için bir export yapıyoruz
export default store;
