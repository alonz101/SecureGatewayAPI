import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMessages, postMessage } from '../services/api';

export const getMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const response = await fetchMessages();
  return response;
});

export const createMessage = createAsyncThunk('chat/postMessage', async (content) => {
  const response = await postMessage(content);
  return response;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getMessages.fulfilled]: (state, action) => {
      return action.payload;
    },
    [createMessage.fulfilled]: (state, action) => {
      state.push({
        messageId: Date.now().toString(),
        content: action.payload,
        senderId: 'currentUserId',
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export default chatSlice.reducer;
