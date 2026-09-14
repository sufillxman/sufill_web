import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { submitContactApi } from '../../services/api';

export const submitContact = createAsyncThunk('contact/submitContact', async (payload) => {
  const data = await submitContactApi(payload);
  return data;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    message: null,
    error: null,
  },
  reducers: {
    resetContactState: (state) => {
      state.status = 'idle';
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.status = 'loading';
        state.message = null;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.status = 'succeeded';
        state.message = 'Message sent successfully. I will connect with you soon.';
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unable to send message at the moment.';
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
