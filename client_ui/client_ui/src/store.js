import chatReducer from './features/chatSlice';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    products: productsReducer
  }
});
