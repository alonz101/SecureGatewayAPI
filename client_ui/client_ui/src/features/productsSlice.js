import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import config from '../config';
import { fetchProducts } from '../services/api';

const endpoint = config.API_ENDPOINT;

// Async thunk
export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  const response = await fetchProducts();
  return response;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchProductsThunk.fulfilled]: (state, action) => {
      return action.payload;
    }
  }
});

export default productsSlice.reducer;

