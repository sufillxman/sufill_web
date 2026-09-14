import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProjectsApi } from '../../services/api';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const data = await fetchProjectsApi();
  return data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectsSlice.reducer;
