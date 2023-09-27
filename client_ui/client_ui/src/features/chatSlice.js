import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMessages, postMessage } from '../services/api';

export const getMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const response = await fetchMessages();
  return response;
});

export const createMessage = createAsyncThunk('chat/postMessage', async (contnet) => {

  const response = await postMessage(contnet);
  return response;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {
    addReceivedMessage: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [getMessages.fulfilled]: (state, action) => {
      return action.payload;
    },
    [createMessage.fulfilled]: (state, action) => {
      state.push({
        content: action.payload,
        senderId: 'currentUserId',
        timestamp: new Date().toISOString(),
        // messageId should be provided by your backend after a successful postMessage
      });
    },
  },
});

// Export the new reducer for use in the Pusher event
export const { addReceivedMessage } = chatSlice.actions;

export default chatSlice.reducer;
